---
sidebar_position: 1
---

# Migration from react-countdown-circle-timer

ArcTimer is a drop-in replacement for `react-countdown-circle-timer` with additional features.

## Install

```bash
# Remove old package
npm uninstall react-countdown-circle-timer

# Install ArcTimer
npm install @ArcTimer/react
```

## Update Imports

```diff
- import { CountdownCircleTimer } from 'react-countdown-circle-timer'
+ import { CountdownCircleTimer } from '@ArcTimer/react'
```

## Prop Changes

| Old Prop | New Prop | Notes |
|----------|----------|-------|
| `isGrowing` | `isCountUp` | Renamed for clarity |
| `key` (for reset) | `key` or `ref.reset()` | Both work, ref is preferred |
| All other props | Same | Fully compatible |

## Children Render Prop

The children function receives additional fields:

```diff
  <CountdownCircleTimer duration={60}>
-   {({ remainingTime, elapsedTime, color }) => (
+   {({ remainingTime, elapsedTime, color, progress, isComplete }) => (
      <span>{remainingTime}</span>
    )}
  </CountdownCircleTimer>
```

## New Features Available

After migrating, you can immediately use:

- **Easing**: `easing="easeInOut"` or spring physics
- **Imperative API**: `ref.play()`, `ref.pause()`, `ref.reset()`
- **TimerGroup**: Multi-timer orchestration
- **Theming**: Built-in dark mode and custom themes
- **Accessibility**: Full WCAG 2.1 AA compliance
- **Count-up mode**: `isCountUp` prop
