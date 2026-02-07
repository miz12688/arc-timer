---
sidebar_position: 2
---

# Animations

ArcTimer supports multiple animation systems for visual polish.

## Easing Functions

7 built-in easing functions:

```tsx
<CountdownCircleTimer duration={60} easing="easeInOut" />
```

Available: `linear`, `easeIn`, `easeOut`, `easeInOut`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`

## Spring Animation

Physics-based spring for natural motion:

```tsx
<CountdownCircleTimer
  duration={60}
  easing={{ type: 'spring', tension: 170, friction: 26 }}
/>
```

| Param | Default | Description |
|-------|---------|-------------|
| `tension` | `170` | Spring stiffness |
| `friction` | `26` | Damping |
| `mass` | `1` | Mass of the spring |

## Custom Easing

Pass any function `(t: number) => number` where `t` ranges from 0 to 1:

```tsx
<CountdownCircleTimer
  duration={60}
  easing={(t) => t * t * t}  // Cubic ease-in
/>
```

## Bounce Effect

Bounce animation at completion or specific time thresholds:

```tsx
<CountdownCircleTimer
  duration={60}
  bounceOnComplete
  bounceAt={[10, 5]}
/>
```

## Pulse Effect

Periodic scale/opacity oscillation:

```tsx
<CountdownCircleTimer
  duration={60}
  pulse={{ interval: 5, scale: 1.05, opacity: 0.8 }}
/>
```

## Animation Frame Callback

Access every frame's progress for custom animations:

```tsx
<CountdownCircleTimer
  duration={60}
  onAnimationFrame={(progress) => {
    // progress: 0 to 1
    console.log(`${(progress * 100).toFixed(1)}% complete`)
  }}
/>
```

## Reduced Motion

ArcTimer auto-detects `prefers-reduced-motion` and disables spring/bounce/pulse animations. You can also use the hook directly:

```tsx
import { useReducedMotion } from '@ArcTimer/core'

function App() {
  const prefersReducedMotion = useReducedMotion()
  // ...
}
```
