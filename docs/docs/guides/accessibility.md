---
sidebar_position: 5
---

# Accessibility

ArcTimer targets WCAG 2.1 Level AA compliance.

## ARIA Attributes

The timer automatically includes:

- `role="timer"` - Semantic timer role
- `aria-live="polite"` - Screen reader announcements
- `aria-label` - Auto-generated (e.g., "25 seconds remaining")

### Custom ARIA Label

```tsx
<CountdownCircleTimer
  duration={60}
  ariaLabel="Pomodoro work session timer"
/>

// Or dynamic:
<CountdownCircleTimer
  duration={60}
  ariaLabel={({ remainingTime }) =>
    `${remainingTime} seconds left in work session`
  }
/>
```

## Screen Reader Announcements

By default, the timer announces at:
- Every 10 seconds (`announceInterval={10}`)
- 50%, 25%, 10% of duration
- 5 seconds remaining
- Completion

```tsx
// Change interval
<CountdownCircleTimer duration={60} announceInterval={5} />
```

## Keyboard Navigation

When focused, the timer supports:

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `R` | Reset |
| `Escape` | Stop |

## Reduced Motion

ArcTimer auto-detects `prefers-reduced-motion`:
- Disables spring, bounce, and pulse animations
- Falls back to linear easing
- Progress still updates smoothly

```tsx
import { useReducedMotion } from '@ArcTimer/core'

function App() {
  const prefersReducedMotion = useReducedMotion()
  // Use this to conditionally enable animations
}
```

## High Contrast

ArcTimer respects `forced-colors` mode. All default colors meet WCAG AA contrast ratios:

- Text: 4.5:1 minimum
- Graphics: 3:1 minimum

## Focus Indicator

A visible focus ring appears on keyboard focus. Customize via theme:

```tsx
const theme = createTheme({
  accessibility: {
    focusRingColor: '#8E44AD',
    focusRingWidth: 3,
    focusRingOffset: 2,
  },
})
```
