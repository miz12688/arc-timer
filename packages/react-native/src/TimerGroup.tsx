import {
  forwardRef,
  useImperativeHandle,
  Children,
  cloneElement,
  isValidElement,
  useMemo,
} from 'react'
import { View, StyleSheet } from 'react-native'
import {
  useTimerGroup,
  TimerGroupContext,
  type TimerGroupProps,
  type TimerGroupRef,
} from '@ArcTimer/core'

export const TimerGroup = forwardRef<TimerGroupRef, TimerGroupProps>(
  (props, ref) => {
    const {
      mode = 'sequential',
      staggerDelay = 0,
      isPlaying = false,
      onGroupComplete,
      onTimerComplete,
      children,
    } = props

    const childArray = Children.toArray(children)
    const timerCount = childArray.length

    const group = useTimerGroup({
      mode,
      staggerDelay,
      isPlaying,
      timerCount,
      onGroupComplete,
      onTimerComplete,
    })

    const { timers, playAll, pauseAll, resetAll } = group
    const handleTimerComplete = (group as any)._handleTimerComplete

    useImperativeHandle(
      ref,
      () => ({
        playAll,
        pauseAll,
        resetAll,
      }),
      [playAll, pauseAll, resetAll]
    )

    const contextValue = useMemo(
      () => ({
        mode,
        isTimerPlaying: (index: number) =>
          timers[index]?.isPlaying ?? false,
        onTimerDone: handleTimerComplete,
        registerTimer: () => {},
      }),
      [mode, timers, handleTimerComplete]
    )

    const enhancedChildren = childArray.map((child, index) => {
      if (!isValidElement(child)) return child

      const timerState = timers[index]
      return cloneElement(child as React.ReactElement<any>, {
        key: index,
        isPlaying: timerState?.isPlaying ?? false,
        onComplete: (elapsed: number) => {
          handleTimerComplete(index)
          const originalOnComplete = (child as any).props?.onComplete
          return originalOnComplete?.(elapsed)
        },
      })
    })

    return (
      <TimerGroupContext.Provider value={contextValue}>
        <View style={styles.container}>{enhancedChildren}</View>
      </TimerGroupContext.Provider>
    )
  }
)

TimerGroup.displayName = 'TimerGroup'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})
