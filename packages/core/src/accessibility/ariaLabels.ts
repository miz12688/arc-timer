import type { RenderInfo } from '../types'

export function generateAriaLabel(
  remainingTime: number,
  isCountUp: boolean
): string {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  const timeStr =
    minutes > 0
      ? `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`
      : `${seconds} second${seconds !== 1 ? 's' : ''}`

  return isCountUp
    ? `${timeStr} elapsed`
    : `${timeStr} remaining`
}

export function resolveAriaLabel(
  ariaLabel: string | ((info: RenderInfo) => string) | undefined,
  info: RenderInfo,
  isCountUp: boolean
): string {
  if (typeof ariaLabel === 'function') {
    return ariaLabel(info)
  }

  if (typeof ariaLabel === 'string') {
    return ariaLabel
  }

  return generateAriaLabel(info.remainingTime, isCountUp)
}
