import type { PulseConfig } from '../types'

export interface BounceResult {
  scale: number
  active: boolean
}

export function computeBounce(
  remainingTime: number,
  prevRemainingTime: number,
  bounceAt: number[],
  bounceOnComplete: boolean,
  isComplete: boolean,
  elapsedSinceBounce: number
): BounceResult {
  const bounceDuration = 300 // ms

  // Check if we just crossed a bounce threshold
  const shouldBounce =
    (bounceOnComplete && isComplete) ||
    bounceAt.some(
      (threshold) =>
        prevRemainingTime > threshold && remainingTime <= threshold
    )

  if (!shouldBounce && elapsedSinceBounce > bounceDuration) {
    return { scale: 1, active: false }
  }

  if (shouldBounce || elapsedSinceBounce <= bounceDuration) {
    // Bounce animation: scale up then back down
    const progress = Math.min(elapsedSinceBounce / bounceDuration, 1)
    const bounceScale = 1 + 0.1 * Math.sin(progress * Math.PI)
    return { scale: bounceScale, active: progress < 1 }
  }

  return { scale: 1, active: false }
}

export interface PulseResult {
  scale: number
  opacity: number
}

export function computePulse(
  elapsedTime: number,
  config: PulseConfig | false | undefined
): PulseResult {
  if (!config) {
    return { scale: 1, opacity: 1 }
  }

  const { interval, scale = 1.05, opacity = 1 } = config

  if (interval <= 0) {
    return { scale: 1, opacity: 1 }
  }

  const cycleProgress = (elapsedTime % interval) / interval
  const sinValue = Math.sin(cycleProgress * 2 * Math.PI)

  // Normalize sin from [-1, 1] to [0, 1]
  const normalized = (sinValue + 1) / 2

  const currentScale = 1 + (scale - 1) * normalized
  const minOpacity = Math.max(0, 2 * opacity - 1)
  const currentOpacity = minOpacity + (1 - minOpacity) * normalized

  return {
    scale: currentScale,
    opacity: currentOpacity,
  }
}
