# @toankhontech/arctimer-core

Platform-agnostic countdown timer engine powering [ArcTimer](https://github.com/toankhontech/arc-timer).

This package contains the shared logic, hooks, animation engine, and SVG math used by `@toankhontech/arctimer-react`, `@toankhontech/arctimer-react-native`, and `@toankhontech/arctimer-expo`. It has zero platform-specific dependencies.

## When to use this directly

Most users should install `@toankhontech/arctimer-react` or `@toankhontech/arctimer-react-native` instead. Use this package only if you're building a custom renderer or need access to the raw timer logic.

## Install

```bash
npm install @toankhontech/arctimer-core
```

## What's inside

- **`useCountdown` hook** — state machine + RAF loop + color interpolation + SVG path calculation
- **Timer state machine** — `idle → playing → paused → completed` with clean transitions
- **Animation engine** — 7 built-in easings, spring physics (damped harmonic oscillator), bounce and pulse effects
- **Color interpolation** — smooth RGB-space transitions between any number of colors
- **SVG path calculation** — circle arc paths, circumference, stroke-dashoffset math
- **Accessibility utilities** — ARIA labels, live region announcements, reduced motion detection
- **TypeScript types** — full type exports for `CountdownProps`, `TimerRef`, `RenderInfo`, `Theme`, etc.

## Basic Usage

```tsx
import { useCountdown } from '@toankhontech/arctimer-core'

function MyTimer() {
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    color,
  } = useCountdown({
    isPlaying: true,
    duration: 60,
    colors: ['#3498DB', '#E74C3C'],
    colorsTime: [60, 0],
    size: 180,
    strokeWidth: 12,
  })

  // Render however you want — SVG, Canvas, native views, etc.
  return (
    <svg width={180} height={180}>
      <path d={path} fill="none" stroke="#ddd" strokeWidth={12} />
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={12}
        strokeDasharray={pathLength}
        strokeDashoffset={strokeDashoffset}
      />
      <text x="90" y="90" textAnchor="middle" fill={color} fontSize="32">
        {remainingTime}
      </text>
    </svg>
  )
}
```

## Links

- [GitHub](https://github.com/toankhontech/arc-timer)
- [@toankhontech/arctimer-react](https://www.npmjs.com/package/@toankhontech/arctimer-react) — React web component
- [@toankhontech/arctimer-react-native](https://www.npmjs.com/package/@toankhontech/arctimer-react-native) — React Native component

## License

MIT
