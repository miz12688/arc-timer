---
sidebar_position: 3
---

# Multi-Timer (TimerGroup)

Orchestrate multiple timers with `TimerGroup`.

## Sequential Mode (Pomodoro)

Timers run one after another:

```tsx
import { TimerGroup, CountdownCircleTimer } from '@ArcTimer/react'

function Pomodoro() {
  return (
    <TimerGroup
      mode="sequential"
      isPlaying
      onGroupComplete={() => alert('Session complete!')}
    >
      <CountdownCircleTimer duration={1500} colors="#E74C3C" />
      <CountdownCircleTimer duration={300} colors="#2ECC71" />
      <CountdownCircleTimer duration={1500} colors="#E74C3C" />
      <CountdownCircleTimer duration={900} colors="#3498DB" />
    </TimerGroup>
  )
}
```

## Parallel Mode (Cooking)

All timers run simultaneously:

```tsx
<TimerGroup mode="parallel" isPlaying>
  <CountdownCircleTimer duration={600} colors="#E74C3C" />
  <CountdownCircleTimer duration={900} colors="#F39C12" />
  <CountdownCircleTimer duration={1200} colors="#2ECC71" />
</TimerGroup>
```

## Staggered Mode

Timers start with configurable delays:

```tsx
<TimerGroup mode="staggered" staggerDelay={500} isPlaying>
  <CountdownCircleTimer duration={60} colors="#3498DB" />
  <CountdownCircleTimer duration={60} colors="#E74C3C" />
  <CountdownCircleTimer duration={60} colors="#2ECC71" />
</TimerGroup>
```

## Group Controls (via ref)

```tsx
const groupRef = useRef<TimerGroupRef>(null)

<TimerGroup ref={groupRef} mode="sequential">
  {/* timers */}
</TimerGroup>

<button onClick={() => groupRef.current?.playAll()}>Play All</button>
<button onClick={() => groupRef.current?.pauseAll()}>Pause All</button>
<button onClick={() => groupRef.current?.resetAll()}>Reset All</button>
```

## Headless Hook

For fully custom UI:

```tsx
import { useTimerGroup } from '@ArcTimer/core'

const { timers, activeIndex, playAll, pauseAll, resetAll, groupState } =
  useTimerGroup({
    mode: 'sequential',
    timerCount: 4,
    isPlaying: true,
    onGroupComplete: () => console.log('Done!'),
  })
```
