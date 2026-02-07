# @toankhontech/arctimer-react

Smooth, 60fps countdown circle timer for React.

<p align="center">
  <img src="https://raw.githubusercontent.com/toankhontech/arc-timer/main/assets/demo.gif" alt="ArcTimer Demo" width="600" />
</p>

Part of the [ArcTimer](https://github.com/toankhontech/arc-timer) monorepo. Also available for [React Native](https://www.npmjs.com/package/@toankhontech/arctimer-react-native) and [Expo](https://www.npmjs.com/package/@toankhontech/arctimer-expo).

## Install

```bash
npm install @toankhontech/arctimer-react
```

## Quick Start

```tsx
import { CountdownCircleTimer } from '@toankhontech/arctimer-react'

function App() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={60}
      colors={['#3498DB', '#F39C12', '#E74C3C']}
      colorsTime={[60, 30, 0]}
    >
      {({ remainingTime, color }) => (
        <span style={{ color, fontSize: 32 }}>{remainingTime}</span>
      )}
    </CountdownCircleTimer>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | **required** | Duration in seconds |
| `isPlaying` | `boolean` | `false` | Start/stop the timer |
| `colors` | `string \| string[]` | `'#3498DB'` | Single color or array for gradient |
| `colorsTime` | `number[]` | auto | Time thresholds for color transitions |
| `size` | `number` | `180` | Width and height in px |
| `strokeWidth` | `number` | `12` | Arc stroke width |
| `trailColor` | `string` | `'#d9d9d9'` | Background circle color |
| `easing` | `string \| object` | `'linear'` | `'linear'`, `'easeIn'`, `'easeOut'`, `'easeInOut'`, or spring config |
| `isCountUp` | `boolean` | `false` | Count up instead of down |
| `initialRemainingTime` | `number` | — | Start from a specific time |
| `children` | `(info) => ReactNode` | — | Render function for center content |
| `onComplete` | `() => void \| { shouldRepeat, delay }` | — | Fires when timer reaches zero |
| `onUpdate` | `(remainingTime) => void` | — | Fires every second |

### Animation Effects

| Prop | Type | Description |
|------|------|-------------|
| `bounceOnComplete` | `boolean` | Scale bounce when timer completes |
| `bounceAt` | `number[]` | Bounce at specific remaining times (e.g. `[10, 5]`) |
| `pulse` | `{ interval, scale, opacity }` | Periodic breathing animation |

### Render Function

The `children` render function receives:

```tsx
{
  remainingTime: number  // seconds left (integer)
  elapsedTime: number    // seconds elapsed (integer)
  color: string          // current interpolated color
  progress: number       // 0 to 1
  isComplete: boolean    // true when timer is done
}
```

## Imperative API

Control the timer programmatically via ref:

```tsx
import { useRef } from 'react'
import { CountdownCircleTimer, type TimerRef } from '@toankhontech/arctimer-react'

function App() {
  const timerRef = useRef<TimerRef>(null)

  return (
    <>
      <CountdownCircleTimer ref={timerRef} duration={60} colors="#3498DB">
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <button onClick={() => timerRef.current?.pause()}>Pause</button>
      <button onClick={() => timerRef.current?.play()}>Play</button>
      <button onClick={() => timerRef.current?.reset()}>Reset</button>
    </>
  )
}
```

## Multi-Timer (Sequential / Parallel)

Run timers one after another, or all at once:

```tsx
import { TimerGroup, CountdownCircleTimer } from '@toankhontech/arctimer-react'

<TimerGroup mode="sequential" isPlaying onGroupComplete={() => alert('Done!')}>
  <CountdownCircleTimer duration={1500} colors="#E74C3C" />
  <CountdownCircleTimer duration={300} colors="#2ECC71" />
</TimerGroup>
```

## Theming

```tsx
import { TimerThemeProvider, darkTheme } from '@toankhontech/arctimer-themes'

<TimerThemeProvider theme={darkTheme}>
  <CountdownCircleTimer duration={60} colors="#00D2FF" />
</TimerThemeProvider>
```

5 built-in themes: `defaultTheme`, `darkTheme`, `minimalTheme`, `vibrantTheme`, `neonTheme`

## Easing & Spring Physics

```tsx
// Built-in easing
<CountdownCircleTimer easing="easeInOut" ... />

// Spring physics
<CountdownCircleTimer easing={{ type: 'spring', tension: 170, friction: 26 }} ... />
```

## Migrating from react-countdown-circle-timer

Drop-in replacement:

```diff
- import { CountdownCircleTimer } from 'react-countdown-circle-timer'
+ import { CountdownCircleTimer } from '@toankhontech/arctimer-react'
```

## Links

- [GitHub](https://github.com/toankhontech/arc-timer)
- [Full API Reference](https://github.com/toankhontech/arc-timer/blob/main/docs/docs/api-reference.md)

## License

MIT
