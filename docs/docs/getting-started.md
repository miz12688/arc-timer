---
sidebar_position: 1
---

# Getting Started

Install ArcTimer for your platform and start using it in minutes.

## Installation

### React (Web)

```bash
npm install @ArcTimer/react
```

### React Native

```bash
npm install @ArcTimer/react-native react-native-svg
```

### Expo

```bash
npx expo install @ArcTimer/expo
```

### Headless Hook Only

```bash
npm install @ArcTimer/core
```

## Quick Start

### React (Web)

```tsx
import { CountdownCircleTimer } from '@ArcTimer/react'

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

### React Native

```tsx
import { CountdownCircleTimer } from '@ArcTimer/react-native'
import { Text } from 'react-native'

function App() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={60}
      colors={['#3498DB', '#F39C12', '#E74C3C']}
      colorsTime={[60, 30, 0]}
    >
      {({ remainingTime }) => (
        <Text style={{ fontSize: 32 }}>{remainingTime}</Text>
      )}
    </CountdownCircleTimer>
  )
}
```

### Expo

```tsx
import { CountdownCircleTimer } from '@ArcTimer/expo'
import { Text } from 'react-native'

function App() {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={60}
      colors="#3498DB"
    >
      {({ remainingTime }) => (
        <Text style={{ fontSize: 32 }}>{remainingTime}</Text>
      )}
    </CountdownCircleTimer>
  )
}
```

## Next Steps

- [API Reference](./api-reference) - Full props and hooks documentation
- [Animations Guide](./guides/animations) - Easing, spring, bounce, and pulse
- [Multi-Timer Guide](./guides/multi-timer) - TimerGroup for Pomodoro, HIIT, etc.
- [Theming Guide](./guides/theming) - Built-in themes and custom themes
- [Accessibility Guide](./guides/accessibility) - WCAG 2.1 AA compliance
