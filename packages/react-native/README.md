# @toankhontech/arctimer-react-native

Smooth, 60fps countdown circle timer for React Native.

<p align="center">
  <img src="https://raw.githubusercontent.com/toankhontech/arc-timer/main/assets/demo.gif" alt="ArcTimer Demo" width="600" />
</p>

Same API as the [React web version](https://www.npmjs.com/package/@toankhontech/arctimer-react) — swap one import and it works. Part of the [ArcTimer](https://github.com/toankhontech/arc-timer) monorepo.

## Install

```bash
npm install @toankhontech/arctimer-react-native react-native-svg

# If using Expo, use the Expo package instead:
# npx expo install @toankhontech/arctimer-expo
```

## Quick Start

```tsx
import { CountdownCircleTimer } from '@toankhontech/arctimer-react-native'

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

## Props

Same props as `@toankhontech/arctimer-react`. See the [full props table](https://www.npmjs.com/package/@toankhontech/arctimer-react#props).

Key differences from the web version:
- Renders using `react-native-svg` (`<Svg>`, `<Path>`) instead of HTML `<svg>`
- Center content is wrapped in a React Native `<View>` instead of `<div>`
- All animation effects (bounce, pulse, easing, spring) work identically

## Imperative API

```tsx
import { useRef } from 'react'
import { CountdownCircleTimer, type TimerRef } from '@toankhontech/arctimer-react-native'

const timerRef = useRef<TimerRef>(null)

<CountdownCircleTimer ref={timerRef} duration={60} colors="#3498DB">
  {({ remainingTime }) => <Text>{remainingTime}</Text>}
</CountdownCircleTimer>

// timerRef.current?.play()
// timerRef.current?.pause()
// timerRef.current?.reset()
```

## Multi-Timer

```tsx
import { TimerGroup, CountdownCircleTimer } from '@toankhontech/arctimer-react-native'

<TimerGroup mode="sequential" isPlaying>
  <CountdownCircleTimer duration={1500} colors="#E74C3C" />
  <CountdownCircleTimer duration={300} colors="#2ECC71" />
</TimerGroup>
```

## Links

- [GitHub](https://github.com/toankhontech/arc-timer)
- [@toankhontech/arctimer-react](https://www.npmjs.com/package/@toankhontech/arctimer-react) — React web version
- [@toankhontech/arctimer-expo](https://www.npmjs.com/package/@toankhontech/arctimer-expo) — Expo version

## License

MIT
