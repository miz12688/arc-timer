import type { Rotation } from '../types'

export function getCirclePath(
  size: number,
  strokeWidth: number,
  rotation: Rotation = 'clockwise'
): string {
  const halfSize = size / 2
  const radius = halfSize - strokeWidth / 2

  const isClockwise = rotation === 'clockwise'
  const sweepFlag = isClockwise ? 1 : 0

  return [
    `M ${halfSize},${strokeWidth / 2}`,
    `A ${radius},${radius} 0 1,${sweepFlag} ${halfSize},${size - strokeWidth / 2}`,
    `A ${radius},${radius} 0 1,${sweepFlag} ${halfSize},${strokeWidth / 2}`,
  ].join(' ')
}

export function getPathLength(size: number, strokeWidth: number): number {
  const radius = (size - strokeWidth) / 2
  return 2 * Math.PI * radius
}

export function getStrokeDashoffset(
  pathLength: number,
  progress: number
): number {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  return pathLength * (1 - clampedProgress)
}
