// Hooks
export { useCountdown } from './useCountdown'
export { useTimerGroup, TimerGroupContext, useTimerGroupContext } from './useTimerGroup'

// Engine
export {
  timerReducer,
  createInitialState,
} from './engine/timerMachine'
export { subscribe, _resetForTesting } from './engine/rafLoop'
export {
  interpolateColor,
  getStrokeColor,
  hexToRgb,
  rgbToHex,
} from './engine/colorInterpolation'

// SVG
export {
  getCirclePath,
  getPathLength,
  getStrokeDashoffset,
} from './svg/pathCalculation'

// Animation
export { easings, resolveEasing, getEasingNames } from './animation/easings'
export { createSpringEasing } from './animation/spring'
export { computeBounce, computePulse } from './animation/effects'

// Accessibility
export { generateAriaLabel, resolveAriaLabel } from './accessibility/ariaLabels'
export {
  useAnnouncer,
  shouldAnnounce,
  getAnnouncementText,
} from './accessibility/announcer'
export { useReducedMotion } from './accessibility/reducedMotion'

// Types
export type {
  CountdownProps,
  TimerRef,
  RenderInfo,
  OnCompleteResult,
  UseCountdownReturn,
  TimerStatus,
  TimerState,
  TimerEvent,
  EasingName,
  EasingConfig,
  EasingFn,
  SpringConfig,
  PulseConfig,
  Rotation,
  Color,
  ColorFormat,
  Theme,
  ThemeColors,
  ThemeSizes,
  ThemeAnimation,
  ThemeAccessibility,
  ThemeOverride,
  DeepPartial,
  TimerGroupMode,
  TimerGroupProps,
  TimerGroupRef,
  UseTimerGroupReturn,
} from './types'
