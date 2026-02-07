---
sidebar_position: 2
---

# API Reference

## CountdownCircleTimer

The main component for rendering a countdown circle timer.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | **required** | Countdown duration in seconds (1 - 356400) |
| `isPlaying` | `boolean` | `false` | Whether timer is actively counting |
| `colors` | `Color \| Color[]` | `'#3498DB'` | Single color string or array of HEX colors |
| `colorsTime` | `number[]` | auto | Time thresholds for color transitions |
| `size` | `number` | `180` | SVG viewport width/height in pixels |
| `strokeWidth` | `number` | `12` | Progress arc stroke width |
| `trailColor` | `string` | `'#d9d9d9'` | Background trail circle color |
| `trailStrokeWidth` | `number` | `strokeWidth` | Trail circle stroke width |
| `strokeLinecap` | `'round' \| 'butt' \| 'square'` | `'round'` | Stroke line cap style |
| `rotation` | `'clockwise' \| 'counterclockwise'` | `'clockwise'` | Animation direction |
| `isCountUp` | `boolean` | `false` | Count up instead of down |
| `initialRemainingTime` | `number` | `duration` | Start time for resuming |
| `updateInterval` | `number` | `1` | State update interval (seconds) |
| `easing` | `EasingConfig` | `'linear'` | Animation easing |
| `bounceOnComplete` | `boolean` | `false` | Bounce at completion |
| `bounceAt` | `number[]` | `[]` | Time thresholds for bounce |
| `pulse` | `PulseConfig \| false` | `false` | Pulse animation config |
| `children` | `(info: RenderInfo) => ReactNode` | - | Render function for content |
| `onComplete` | `(elapsed: number) => void \| OnCompleteResult` | - | Completion callback |
| `onUpdate` | `(remainingTime: number) => void` | - | Time update callback |
| `onAnimationFrame` | `(progress: number) => void` | - | Frame callback |
| `ariaLabel` | `string \| ((info) => string)` | auto | Custom ARIA label |
| `announceInterval` | `number` | `10` | Screen reader interval (seconds) |

### RenderInfo

```ts
type RenderInfo = {
  remainingTime: number
  elapsedTime: number
  color: string
  progress: number    // 0 to 1
  isComplete: boolean
}
```

### OnCompleteResult

```ts
type OnCompleteResult = {
  shouldRepeat?: boolean
  delay?: number
  newInitialRemainingTime?: number
}
```

## Imperative API (ref)

```tsx
const timerRef = useRef<TimerRef>(null)

<CountdownCircleTimer ref={timerRef} duration={60} />

timerRef.current?.play()
timerRef.current?.pause()
timerRef.current?.reset()
timerRef.current?.reset(120) // reset with new duration
timerRef.current?.getState() // { remainingTime, elapsedTime, isPlaying, progress, isComplete }
```

## TimerGroup

Container for orchestrating multiple timers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'sequential' \| 'parallel' \| 'staggered'` | `'sequential'` | Orchestration mode |
| `staggerDelay` | `number` | `0` | Delay between starts (ms) |
| `isPlaying` | `boolean` | `false` | Control all timers |
| `onGroupComplete` | `() => void` | - | All timers finished |
| `onTimerComplete` | `(index: number) => void` | - | Individual timer finished |

## useCountdown Hook

Headless hook for custom UI.

```tsx
const {
  path, pathLength, stroke, strokeDashoffset,
  remainingTime, elapsedTime, progress, color,
  size, strokeWidth, isComplete, isPlaying,
} = useCountdown({ duration: 60, isPlaying: true })
```

## useTimerGroup Hook

Headless hook for custom multi-timer UI.

```tsx
const {
  timers, activeIndex,
  playAll, pauseAll, resetAll,
  groupState,
} = useTimerGroup({ mode: 'sequential', timerCount: 4, isPlaying: true })
```

## Easing

```ts
type EasingName = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'

type SpringConfig = { type: 'spring', tension?: number, friction?: number, mass?: number }

type EasingFn = (t: number) => number
```
