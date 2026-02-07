# @toankhontech/arctimer-themes

Pre-built themes and theming utilities for [ArcTimer](https://github.com/toankhontech/arc-timer).

## Install

```bash
npm install @toankhontech/arctimer-themes
```

Requires `@toankhontech/arctimer-react` (or the react-native/expo variant) as a peer.

## Usage

Wrap your timers in `TimerThemeProvider` to apply a theme:

```tsx
import { CountdownCircleTimer } from '@toankhontech/arctimer-react'
import { TimerThemeProvider, darkTheme } from '@toankhontech/arctimer-themes'

function App() {
  return (
    <TimerThemeProvider theme={darkTheme}>
      <CountdownCircleTimer duration={60} colors="#00D2FF">
        {({ remainingTime }) => <span>{remainingTime}</span>}
      </CountdownCircleTimer>
    </TimerThemeProvider>
  )
}
```

## Built-in Themes

| Theme | Description |
|-------|-------------|
| `defaultTheme` | Light background, clean defaults |
| `darkTheme` | Dark background with adjusted trail colors |
| `minimalTheme` | Thin strokes, muted colors |
| `vibrantTheme` | Bold colors, thicker strokes |
| `neonTheme` | Neon glow effect on dark background |

## Custom Themes

Use `createTheme` to build your own:

```tsx
import { createTheme } from '@toankhontech/arctimer-themes'

const myTheme = createTheme({
  colors: {
    trail: '#2a2a2a',
    text: '#ffffff',
  },
  timer: {
    size: 200,
    strokeWidth: 10,
  },
})
```

## Auto Dark Mode

Pass `"auto"` to detect the user's system preference:

```tsx
<TimerThemeProvider theme="auto">
  {/* Uses defaultTheme or darkTheme based on prefers-color-scheme */}
</TimerThemeProvider>
```

## Links

- [GitHub](https://github.com/toankhontech/arc-timer)
- [@toankhontech/arctimer-react](https://www.npmjs.com/package/@toankhontech/arctimer-react)

## License

MIT
