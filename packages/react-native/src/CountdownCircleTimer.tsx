import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useCountdown } from '@ArcTimer/core'
import type { CountdownProps, TimerRef, RenderInfo } from '@ArcTimer/core'

export interface CountdownCircleTimerProps extends CountdownProps {
  testID?: string
}

export const CountdownCircleTimer = forwardRef<
  TimerRef,
  CountdownCircleTimerProps
>((props, ref) => {
  const {
    children,
    trailColor = '#d9d9d9',
    trailStrokeWidth,
    strokeLinecap = 'round',
    testID,
    size = 180,
    strokeWidth = 12,
    ...restProps
  } = props

  const countdown = useCountdown({
    ...restProps,
    size,
    strokeWidth,
  })

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    progress,
    color,
    isComplete,
    _play,
    _pause,
    _reset,
    _getState,
  } = countdown

  useImperativeHandle(ref, () => ({
    play: _play,
    pause: _pause,
    reset: _reset,
    getState: _getState,
  }), [_play, _pause, _reset, _getState])

  const effectiveTrailStrokeWidth = trailStrokeWidth ?? strokeWidth
  const viewBox = `0 0 ${size} ${size}`

  const renderInfo: RenderInfo = useMemo(
    () => ({
      remainingTime,
      elapsedTime,
      color,
      progress,
      isComplete,
    }),
    [remainingTime, elapsedTime, color, progress, isComplete]
  )

  return (
    <View
      testID={testID}
      style={[styles.container, { width: size, height: size }]}
    >
      <Svg viewBox={viewBox} width={size} height={size}>
        <Path
          d={path}
          fill="none"
          stroke={trailColor}
          strokeWidth={effectiveTrailStrokeWidth}
        />
        <Path
          d={path}
          fill="none"
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={`${pathLength}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {typeof children === 'function' && (
        <View style={styles.childrenContainer}>
          {children(renderInfo)}
        </View>
      )}
    </View>
  )
})

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  childrenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
