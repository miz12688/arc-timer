import {
  useState,
  useCallback,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react'
import type {
  TimerGroupMode,
  UseTimerGroupReturn,
} from './types'

export interface UseTimerGroupOptions {
  mode?: TimerGroupMode
  staggerDelay?: number
  isPlaying?: boolean
  timerCount: number
  onGroupComplete?: () => void
  onTimerComplete?: (index: number) => void
}

interface TimerGroupContextValue {
  mode: TimerGroupMode
  isTimerPlaying: (index: number) => boolean
  onTimerDone: (index: number) => void
  registerTimer: (index: number) => void
}

export const TimerGroupContext = createContext<TimerGroupContextValue | null>(
  null
)

export function useTimerGroupContext(): TimerGroupContextValue | null {
  return useContext(TimerGroupContext)
}

export function useTimerGroup(
  options: UseTimerGroupOptions
): UseTimerGroupReturn {
  const {
    mode = 'sequential',
    staggerDelay: _staggerDelay = 0,
    isPlaying = false,
    timerCount,
    onGroupComplete,
    onTimerComplete,
  } = options

  const [activeIndex, setActiveIndex] = useState(0)
  const [groupState, setGroupState] = useState<
    'idle' | 'playing' | 'paused' | 'completed'
  >('idle')
  const [completedTimers, setCompletedTimers] = useState<Set<number>>(
    () => new Set()
  )
  const [timerStates, setTimerStates] = useState<
    Array<{ isPlaying: boolean; isComplete: boolean }>
  >(() =>
    Array.from({ length: timerCount }, () => ({
      isPlaying: false,
      isComplete: false,
    }))
  )

  const onGroupCompleteRef = useRef(onGroupComplete)
  const onTimerCompleteRef = useRef(onTimerComplete)
  onGroupCompleteRef.current = onGroupComplete
  onTimerCompleteRef.current = onTimerComplete

  // Handle isPlaying prop changes
  useEffect(() => {
    if (isPlaying) {
      setGroupState('playing')
    } else if (groupState === 'playing') {
      setGroupState('paused')
    }
  }, [isPlaying, groupState])

  // Compute timer playing states based on mode
  useEffect(() => {
    if (groupState !== 'playing') {
      setTimerStates((prev) =>
        prev.map((t) => ({ ...t, isPlaying: false }))
      )
      return
    }

    setTimerStates((prev) =>
      prev.map((t, i) => {
        if (completedTimers.has(i)) {
          return { ...t, isPlaying: false, isComplete: true }
        }

        switch (mode) {
          case 'sequential':
            return { ...t, isPlaying: i === activeIndex }
          case 'parallel':
            return { ...t, isPlaying: true }
          case 'staggered':
            return { ...t, isPlaying: true }
          default:
            return t
        }
      })
    )
  }, [groupState, mode, activeIndex, completedTimers, timerCount])

  const handleTimerComplete = useCallback(
    (index: number) => {
      onTimerCompleteRef.current?.(index)

      setCompletedTimers((prev) => {
        const next = new Set(prev)
        next.add(index)

        if (next.size >= timerCount) {
          setGroupState('completed')
          onGroupCompleteRef.current?.()
        }

        return next
      })

      if (mode === 'sequential') {
        setActiveIndex((prev) => Math.min(prev + 1, timerCount - 1))
      }
    },
    [mode, timerCount]
  )

  const playAll = useCallback(() => {
    setGroupState('playing')
  }, [])

  const pauseAll = useCallback(() => {
    setGroupState('paused')
  }, [])

  const resetAll = useCallback(() => {
    setActiveIndex(0)
    setGroupState('idle')
    setCompletedTimers(new Set())
    setTimerStates(
      Array.from({ length: timerCount }, () => ({
        isPlaying: false,
        isComplete: false,
      }))
    )
  }, [timerCount])

  return {
    timers: timerStates,
    activeIndex,
    playAll,
    pauseAll,
    resetAll,
    groupState,
    _handleTimerComplete: handleTimerComplete,
  } as UseTimerGroupReturn & { _handleTimerComplete: (index: number) => void }
}
