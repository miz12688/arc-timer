import type { ColorFormat } from '../types'

export function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '')
  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned

  const num = parseInt(fullHex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const clampedFactor = Math.max(0, Math.min(1, factor))
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)

  return rgbToHex(
    r1 + (r2 - r1) * clampedFactor,
    g1 + (g2 - g1) * clampedFactor,
    b1 + (b2 - b1) * clampedFactor
  )
}

export function getStrokeColor(
  colors: ColorFormat | undefined,
  colorsTime: number[] | undefined,
  remainingTime: number,
  duration: number
): string {
  const defaultColor = '#3498DB'

  if (!colors) return defaultColor

  if (typeof colors === 'string') return colors

  if (colors.length === 0) return defaultColor
  if (colors.length === 1) return colors[0]

  const times =
    colorsTime ??
    colors.map((_, i) => duration - (duration / (colors.length - 1)) * i)

  for (let i = 0; i < times.length - 1; i++) {
    const currentTime = times[i]
    const nextTime = times[i + 1]

    if (remainingTime <= currentTime && remainingTime >= nextTime) {
      const range = currentTime - nextTime
      if (range === 0) return colors[i]

      const factor = (currentTime - remainingTime) / range
      return interpolateColor(colors[i], colors[i + 1], factor)
    }
  }

  if (remainingTime >= times[0]) return colors[0]
  return colors[colors.length - 1]
}
