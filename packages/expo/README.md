# @toankhontech/arctimer-expo

ArcTimer for Expo managed workflow. Thin wrapper around `@toankhontech/arctimer-react-native` with Expo-specific utilities.

<p align="center">
  <img src="https://raw.githubusercontent.com/toankhontech/arc-timer/main/assets/demo.gif" alt="ArcTimer Demo" width="600" />
</p>

## Install

```bash
npx expo install @toankhontech/arctimer-expo
```

This package re-exports everything from `@toankhontech/arctimer-react-native` and adds:

- Auto-pause when the app goes to background
- Expo config plugin for auto-linking

## Quick Start

```tsx
import { CountdownCircleTimer } from '@toankhontech/arctimer-expo'

function App() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={60}
      colors={['#3498DB', '#F39C12', '#E74C3C']}
      colorsTime={[60, 30, 0]}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 32, fontWeight: '800' }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer>
  )
}
```

## Auto-pause on Background

Wrap your app with `ExpoTimerProvider` to automatically pause all timers when the app goes to the background:

```tsx
import { ExpoTimerProvider, CountdownCircleTimer } from '@toankhontech/arctimer-expo'

export default function App() {
  return (
    <ExpoTimerProvider>
      <CountdownCircleTimer isPlaying duration={300} colors="#3498DB">
        {({ remainingTime }) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    </ExpoTimerProvider>
  )
}
```

## API

Same API as `@toankhontech/arctimer-react-native`. See the [full documentation](https://www.npmjs.com/package/@toankhontech/arctimer-react#props).

## Links

- [GitHub](https://github.com/toankhontech/arc-timer)
- [@toankhontech/arctimer-react](https://www.npmjs.com/package/@toankhontech/arctimer-react) — React web
- [@toankhontech/arctimer-react-native](https://www.npmjs.com/package/@toankhontech/arctimer-react-native) — React Native bare

## License

MIT
