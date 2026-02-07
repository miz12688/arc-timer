import {
  useReducer,
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
import { timerReducer, createInitialState } from './engine/timerMachine'
import { subscribe } from './engine/rafLoop'
import { getStrokeColor } from './engine/colorInterpolation'
import {
  getCirclePath,
  getPathLength,
  getStrokeDashoffset,
} from './svg/pathCalculation'
import { resolveEasing } from './animation/easings'
import { computeBounce, computePulse } from './animation/effects'
import type {
  CountdownProps,
  UseCountdownReturn,
  OnCompleteResult,
} from './types'

let idCounter = 0
function generateId(): string {
  return `arc-timer-${++idCounter}`
}

export function useCountdown(props: CountdownProps): UseCountdownReturn {
  const {
    duration,
    isPlaying = false,
    colors,
    colorsTime,
    size = 180,
    strokeWidth = 12,
    rotation = 'clockwise',
    isCountUp = false,
    initialRemainingTime,
    updateInterval = 1,
    easing,
    bounceOnComplete = false,
    bounceAt = [],
    pulse,
    onComplete,
    onUpdate,
    onAnimationFrame,
  } = props

  const [state, dispatch] = useReducer(
    timerReducer,
    { duration, initialRemainingTime },
    ({ duration: d, initialRemainingTime: irt }) => createInitialState(d, irt)
  )

  // Integer display time (for text rendering - updates per second)
  const [displayTime, setDisplayTime] = useState(() => {
    if (initialRemainingTime !== undefined) {
      return isCountUp
        ? duration - initialRemainingTime
        : initialRemainingTime
    }
    return isCountUp ? 0 : duration
  })

  // Continuous smooth progress [0..1] (for arc animation - updates every frame)
  const [smoothProgress, setSmoothProgress] = useState(0)

  // Animation effects state
  const [animationScale, setAnimationScale] = useState(1)
  const [animationOpacity, setAnimationOpacity] = useState(1)

  const idRef = useRef(generateId())
  const prevDisplayTimeRef = useRef(displayTime)
  const onCompleteRef = useRef(onComplete)
  const onUpdateRef = useRef(onUpdate)
  const onAnimationFrameRef = useRef(onAnimationFrame)
  const repeatTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Bounce tracking
  const bounceStartRef = useRef<number | null>(null)
  const prevRemainingForBounceRef = useRef(displayTime)

  // Resolve easing function
  const easingFn = useMemo(() => resolveEasing(easing), [easing])

  onCompleteRef.current = onComplete
  onUpdateRef.current = onUpdate
  onAnimationFrameRef.current = onAnimationFrame

  // Imperative API methods
  const play = useCallback(() => {
    dispatch({ type: 'PLAY' })
  }, [])

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' })
  }, [])

  const reset = useCallback(
    (newDuration?: number) => {
      dispatch({ type: 'RESET', duration: newDuration })
      const dur = newDuration ?? duration
      setDisplayTime(isCountUp ? 0 : dur)
      setSmoothProgress(0)
      setAnimationScale(1)
      setAnimationOpacity(1)
      bounceStartRef.current = null
    },
    [duration, isCountUp]
  )

  // Handle isPlaying prop changes
  useEffect(() => {
    if (isPlaying) {
      if (state.status !== 'playing') {
        dispatch({ type: 'PLAY' })
      }
    } else {
      if (state.status === 'playing') {
        dispatch({ type: 'PAUSE' })
      }
    }
  }, [isPlaying, state.status])

  // Handle duration changes
  useEffect(() => {
    if (duration !== state.duration) {
      dispatch({ type: 'RESET', duration })
    }
  }, [duration, state.duration])

  // RAF subscription - updates EVERY FRAME for smooth animation
  useEffect(() => {
    if (state.status !== 'playing' || state.startedAt === null) return

    const startedAt = state.startedAt
    let lastUpdateTime = 0

    const unsubscribe = subscribe(idRef.current, (timestamp: number) => {
      const elapsedMs = timestamp - startedAt
      const elapsedSeconds = elapsedMs / 1000
      const clampedElapsed = Math.min(elapsedSeconds, duration)

      // Compute continuous eased progress (0 to 1) - updates EVERY FRAME
      const linearProgress = duration > 0 ? clampedElapsed / duration : 1
      const easedProgress = easingFn(linearProgress)

      // Update smooth progress for arc animation (every frame = 60fps)
      setSmoothProgress(easedProgress)

      onAnimationFrameRef.current?.(easedProgress)

      // Compute integer remaining time for display
      const rawRemainingTime = Math.max(
        0,
        duration - duration * easedProgress
      )
      const remainingTimeInt = Math.ceil(rawRemainingTime)

      // Bounce effect
      const hasBounceConfig =
        bounceOnComplete || (bounceAt && bounceAt.length > 0)
      if (hasBounceConfig) {
        const prevRemaining = prevRemainingForBounceRef.current
        const shouldStartBounce =
          (bounceOnComplete && rawRemainingTime <= 0 && prevRemaining > 0) ||
          bounceAt.some(
            (t) => prevRemaining > t && remainingTimeInt <= t
          )

        if (shouldStartBounce) {
          bounceStartRef.current = timestamp
        }

        if (bounceStartRef.current !== null) {
          const bounceElapsed = timestamp - bounceStartRef.current
          const result = computeBounce(
            remainingTimeInt,
            prevRemaining,
            bounceAt,
            bounceOnComplete,
            rawRemainingTime <= 0,
            bounceElapsed
          )
          setAnimationScale(result.scale)
          if (!result.active) {
            bounceStartRef.current = null
          }
        }

        prevRemainingForBounceRef.current = remainingTimeInt
      }

      // Pulse effect
      if (pulse) {
        const pulseResult = computePulse(clampedElapsed, pulse)
        setAnimationScale((prev) =>
          bounceStartRef.current !== null ? prev : pulseResult.scale
        )
        setAnimationOpacity(pulseResult.opacity)
      }

      // Update integer display time at the configured interval
      const shouldUpdate =
        updateInterval === 0 ||
        timestamp - lastUpdateTime >= updateInterval * 1000

      if (shouldUpdate) {
        lastUpdateTime = timestamp
        const newDisplayTime = isCountUp
          ? Math.floor(clampedElapsed)
          : remainingTimeInt

        setDisplayTime((prev) => {
          if (prev !== newDisplayTime) {
            return newDisplayTime
          }
          return prev
        })
      }

      if (clampedElapsed >= duration) {
        dispatch({ type: 'COMPLETE' })
      }
    })

    return unsubscribe
  }, [
    state.status,
    state.startedAt,
    duration,
    updateInterval,
    isCountUp,
    easingFn,
    bounceOnComplete,
    bounceAt,
    pulse,
  ])

  // Handle completion
  useEffect(() => {
    if (state.status !== 'completed') return

    const result = onCompleteRef.current?.(state.duration) as
      | OnCompleteResult
      | void

    if (result?.shouldRepeat) {
      const delay = (result.delay ?? 0) * 1000

      repeatTimeoutRef.current = setTimeout(() => {
        if (result.newInitialRemainingTime !== undefined) {
          dispatch({ type: 'RESET' })
          setDisplayTime(
            isCountUp
              ? duration - result.newInitialRemainingTime
              : result.newInitialRemainingTime
          )
        } else {
          dispatch({ type: 'RESET' })
          setDisplayTime(isCountUp ? 0 : duration)
        }
        setSmoothProgress(0)
        dispatch({ type: 'PLAY' })
      }, delay)
    }

    return () => {
      if (repeatTimeoutRef.current) {
        clearTimeout(repeatTimeoutRef.current)
      }
    }
  }, [state.status, state.duration, duration, isCountUp])

  // Call onUpdate when display time changes
  useEffect(() => {
    if (prevDisplayTimeRef.current !== displayTime) {
      prevDisplayTimeRef.current = displayTime
      const rt = isCountUp ? duration - displayTime : displayTime
      onUpdateRef.current?.(rt)
    }
  }, [displayTime, duration, isCountUp])

  // Compute SVG values
  const path = useMemo(
    () => getCirclePath(size, strokeWidth, rotation),
    [size, strokeWidth, rotation]
  )

  const pathLength = useMemo(
    () => getPathLength(size, strokeWidth),
    [size, strokeWidth]
  )

  // Use integer values for text display
  const elapsedTime = isCountUp ? displayTime : duration - displayTime
  const remainingTime = isCountUp ? duration - displayTime : displayTime
  const isComplete = state.status === 'completed'

  // Use SMOOTH continuous progress for SVG arc (this is the key fix!)
  const arcProgress = isCountUp ? smoothProgress : 1 - smoothProgress
  const strokeDashoffset = getStrokeDashoffset(pathLength, arcProgress)

  // Color uses remaining time (integer) for threshold matching
  const color = getStrokeColor(colors, colorsTime, remainingTime, duration)

  // Progress for external consumers (continuous)
  const progress = smoothProgress

  return {
    path,
    pathLength,
    stroke: color,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    progress,
    color,
    size,
    strokeWidth,
    isComplete,
    isPlaying: state.status === 'playing',
    animationScale,
    animationOpacity,
    _play: play,
    _pause: pause,
    _reset: reset,
    _getState: () => ({
      remainingTime,
      elapsedTime,
      isPlaying: state.status === 'playing',
      progress,
      isComplete,
    }),
  } as UseCountdownReturn
}
