---
sidebar_position: 4
---

# Theming

ArcTimer comes with 5 built-in themes and full custom theme support.

## Built-in Themes

| Theme | Description | Best For |
|-------|-------------|----------|
| `defaultTheme` | Clean light with blue primary | General purpose |
| `darkTheme` | Dark bg with bright cyan | Dark mode apps |
| `minimalTheme` | Thin stroke, monochrome | Dashboards |
| `vibrantTheme` | Bold colors, thick stroke | Kids, fitness |
| `neonTheme` | Glow effects on black | Gaming |

## Using a Theme

```tsx
import { TimerThemeProvider, darkTheme } from '@ArcTimer/themes'
import { CountdownCircleTimer } from '@ArcTimer/react'

function App() {
  return (
    <TimerThemeProvider theme={darkTheme}>
      <CountdownCircleTimer duration={60} isPlaying />
    </TimerThemeProvider>
  )
}
```

## Auto Dark Mode

Automatically switch between light/dark based on OS setting:

```tsx
<TimerThemeProvider theme="auto">
  <CountdownCircleTimer duration={60} />
</TimerThemeProvider>
```

## Custom Theme

```tsx
import { createTheme, TimerThemeProvider } from '@ArcTimer/themes'

const myTheme = createTheme({
  name: 'my-theme',
  colors: {
    primary: '#8E44AD',
    trail: '#2C3E50',
    text: '#ECF0F1',
    background: '#1A1A2E',
  },
  sizes: {
    strokeWidth: 14,
  },
})

<TimerThemeProvider theme={myTheme}>
  <CountdownCircleTimer duration={60} />
</TimerThemeProvider>
```

## Extending Themes

```tsx
import { createTheme, darkTheme } from '@ArcTimer/themes'

const customDark = createTheme({
  extends: darkTheme,
  colors: { primary: '#E74C3C' },
})
```

## CSS Custom Properties

When using `TimerThemeProvider` on web, theme values are exposed as CSS variables:

```css
.my-timer {
  color: var(--arc-timer-color-primary);
  background: var(--arc-timer-color-background);
}
```

Available variables:
- `--arc-timer-color-primary`
- `--arc-timer-color-trail`
- `--arc-timer-color-text`
- `--arc-timer-color-background`
- `--arc-timer-size`
- `--arc-timer-stroke-width`
- `--arc-timer-focus-ring-color`
