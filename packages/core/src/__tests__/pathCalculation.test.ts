import { describe, it, expect } from 'vitest'
import {
  getCirclePath,
  getPathLength,
  getStrokeDashoffset,
} from '../svg/pathCalculation'

describe('getCirclePath', () => {
  it('returns valid SVG path string', () => {
    const path = getCirclePath(180, 12)
    expect(path).toContain('M')
    expect(path).toContain('A')
  })

  it('starts at top center', () => {
    const path = getCirclePath(180, 12)
    expect(path).toContain('M 90,6')
  })

  it('generates clockwise path by default', () => {
    const path = getCirclePath(180, 12, 'clockwise')
    expect(path).toContain('1,1')
  })

  it('generates counterclockwise path', () => {
    const path = getCirclePath(180, 12, 'counterclockwise')
    expect(path).toContain('1,0')
  })

  it('adjusts for different sizes', () => {
    const path100 = getCirclePath(100, 10)
    const path200 = getCirclePath(200, 10)
    expect(path100).not.toBe(path200)
  })
})

describe('getPathLength', () => {
  it('returns circumference based on size and stroke', () => {
    const length = getPathLength(180, 12)
    const expectedRadius = (180 - 12) / 2
    const expected = 2 * Math.PI * expectedRadius
    expect(length).toBeCloseTo(expected, 5)
  })

  it('handles different sizes', () => {
    const l1 = getPathLength(100, 10)
    const l2 = getPathLength(200, 10)
    expect(l2).toBeGreaterThan(l1)
  })

  it('thicker stroke reduces radius', () => {
    const thin = getPathLength(180, 5)
    const thick = getPathLength(180, 20)
    expect(thin).toBeGreaterThan(thick)
  })
})

describe('getStrokeDashoffset', () => {
  it('returns full path length at progress 0', () => {
    const offset = getStrokeDashoffset(100, 0)
    expect(offset).toBe(100)
  })

  it('returns 0 at progress 1', () => {
    const offset = getStrokeDashoffset(100, 1)
    expect(offset).toBe(0)
  })

  it('returns half at progress 0.5', () => {
    const offset = getStrokeDashoffset(100, 0.5)
    expect(offset).toBe(50)
  })

  it('clamps progress to [0,1]', () => {
    expect(getStrokeDashoffset(100, -0.5)).toBe(100)
    expect(getStrokeDashoffset(100, 1.5)).toBe(0)
  })
})
