import type { EasingName, EasingFn, EasingConfig } from '../types'
import { createSpringEasing } from './spring'

export const easings: Record<EasingName, EasingFn> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => {
    const t1 = t - 1
    return t1 * t1 * t1 + 1
  },
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

export function resolveEasing(easing: EasingConfig | undefined): EasingFn {
  if (!easing) return easings.linear

  if (typeof easing === 'function') return easing

  if (typeof easing === 'string') {
    return easings[easing] ?? easings.linear
  }

  if (typeof easing === 'object' && easing.type === 'spring') {
    return createSpringEasing(easing)
  }

  return easings.linear
}

export function getEasingNames(): EasingName[] {
  return Object.keys(easings) as EasingName[]
}
