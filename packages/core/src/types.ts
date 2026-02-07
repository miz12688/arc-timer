import type { ReactNode } from 'react'

// --- Timer State Machine ---

export type TimerStatus = 'idle' | 'playing' | 'paused' | 'completed'

export type TimerEvent =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'RESET'; duration?: number }
  | { type: 'COMPLETE' }

export interface TimerState {
  status: TimerStatus
  duration: number
  elapsed: number
  startedAt: number | null
  pausedAt: number | null
}

// --- Colors ---

export type Color = string
export type ColorFormat = Color | Color[]

// --- Easing ---

export type EasingName =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'

export interface SpringConfig {
  type: 'spring'
  tension?: number
  friction?: number
  mass?: number
}

export type EasingFn = (t: number) => number

export type EasingConfig = EasingName | SpringConfig | EasingFn

// --- Effects ---

export interface PulseConfig {
  interval: number
  scale?: number
  opacity?: number
}

// --- Render Info ---

export interface RenderInfo {
  remainingTime: number
  elapsedTime: number
  color: string
  progress: number
  isComplete: boolean
}

// --- Callbacks ---

export interface OnCompleteResult {
  shouldRepeat?: boolean
  delay?: number
  newInitialRemainingTime?: number
}

// --- Rotation ---

export type Rotation = 'clockwise' | 'counterclockwise'

// --- Main Props ---

export interface CountdownProps {
  duration: number
  isPlaying?: boolean
  colors?: ColorFormat
  colorsTime?: number[]
  size?: number
  strokeWidth?: number
  trailColor?: string
  trailStrokeWidth?: number
  strokeLinecap?: 'round' | 'butt' | 'square'
  rotation?: Rotation
  isCountUp?: boolean
  initialRemainingTime?: number
  updateInterval?: number
  easing?: EasingConfig
  bounceOnComplete?: boolean
  bounceAt?: number[]
  pulse?: PulseConfig | false
  onComplete?: (elapsed: number) => OnCompleteResult | void
  onUpdate?: (remainingTime: number) => void
  onAnimationFrame?: (progress: number) => void
  ariaLabel?: string | ((info: RenderInfo) => string)
  announceInterval?: number
  children?: (info: RenderInfo) => ReactNode
}

// --- Imperative Ref ---

export interface TimerRef {
  play: () => void
  pause: () => void
  reset: (newDuration?: number) => void
  getState: () => {
    remainingTime: number
    elapsedTime: number
    isPlaying: boolean
    progress: number
    isComplete: boolean
  }
}

// --- useCountdown Return ---

export interface UseCountdownReturn {
  path: string
  pathLength: number
  stroke: string
  strokeDashoffset: number
  remainingTime: number
  elapsedTime: number
  progress: number
  color: string
  size: number
  strokeWidth: number
  isComplete: boolean
  isPlaying: boolean
  /** Smooth animation scale (for bounce/pulse effects) */
  animationScale: number
  /** Smooth animation opacity (for pulse effect) */
  animationOpacity: number
  /** @internal Imperative play method */
  _play: () => void
  /** @internal Imperative pause method */
  _pause: () => void
  /** @internal Imperative reset method */
  _reset: (newDuration?: number) => void
  /** @internal Imperative getState method */
  _getState: () => {
    remainingTime: number
    elapsedTime: number
    isPlaying: boolean
    progress: number
    isComplete: boolean
  }
}

// --- Timer Group ---

export type TimerGroupMode = 'sequential' | 'parallel' | 'staggered'

export interface TimerGroupProps {
  mode?: TimerGroupMode
  staggerDelay?: number
  isPlaying?: boolean
  onGroupComplete?: () => void
  onTimerComplete?: (index: number) => void
  children: ReactNode
}

export interface TimerGroupRef {
  playAll: () => void
  pauseAll: () => void
  resetAll: () => void
}

export interface UseTimerGroupReturn {
  timers: Array<{
    isPlaying: boolean
    isComplete: boolean
  }>
  activeIndex: number
  playAll: () => void
  pauseAll: () => void
  resetAll: () => void
  groupState: 'idle' | 'playing' | 'paused' | 'completed'
}

// --- Theme ---

export interface ThemeColors {
  primary: string
  trail: string
  text: string
  background: string
  success: string
  warning: string
  danger: string
}

export interface ThemeSizes {
  default: number
  strokeWidth: number
  trailStrokeWidth?: number
}

export interface ThemeAnimation {
  defaultEasing: EasingConfig
}

export interface ThemeAccessibility {
  focusRingColor: string
  focusRingWidth: number
  focusRingOffset: number
}

export interface Theme {
  name: string
  colors: ThemeColors
  sizes: ThemeSizes
  animation: ThemeAnimation
  accessibility: ThemeAccessibility
  strokeLinecap: 'round' | 'butt' | 'square'
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface ThemeOverride extends DeepPartial<Theme> {
  extends?: Theme
}
