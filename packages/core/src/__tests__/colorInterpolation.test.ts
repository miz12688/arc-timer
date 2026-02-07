import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  rgbToHex,
  interpolateColor,
  getStrokeColor,
} from '../engine/colorInterpolation'

describe('hexToRgb', () => {
  it('converts 6-digit hex', () => {
    expect(hexToRgb('#FF0000')).toEqual([255, 0, 0])
    expect(hexToRgb('#00FF00')).toEqual([0, 255, 0])
    expect(hexToRgb('#0000FF')).toEqual([0, 0, 255])
    expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255])
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
  })

  it('converts 3-digit hex', () => {
    expect(hexToRgb('#F00')).toEqual([255, 0, 0])
    expect(hexToRgb('#0F0')).toEqual([0, 255, 0])
    expect(hexToRgb('#00F')).toEqual([0, 0, 255])
  })

  it('handles lowercase', () => {
    expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
  })

  it('handles without hash', () => {
    expect(hexToRgb('FF0000')).toEqual([255, 0, 0])
  })
})

describe('rgbToHex', () => {
  it('converts RGB to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
    expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
    expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
  })

  it('clamps values', () => {
    expect(rgbToHex(300, -10, 128)).toBe('#ff0080')
  })
})

describe('interpolateColor', () => {
  it('returns first color at factor 0', () => {
    expect(interpolateColor('#FF0000', '#0000FF', 0)).toBe('#ff0000')
  })

  it('returns second color at factor 1', () => {
    expect(interpolateColor('#FF0000', '#0000FF', 1)).toBe('#0000ff')
  })

  it('returns midpoint at factor 0.5', () => {
    expect(interpolateColor('#FF0000', '#0000FF', 0.5)).toBe('#800080')
  })

  it('clamps factor to [0,1]', () => {
    expect(interpolateColor('#FF0000', '#0000FF', -1)).toBe('#ff0000')
    expect(interpolateColor('#FF0000', '#0000FF', 2)).toBe('#0000ff')
  })
})

describe('getStrokeColor', () => {
  it('returns default color when no colors provided', () => {
    expect(getStrokeColor(undefined, undefined, 30, 60)).toBe('#3498DB')
  })

  it('returns single color', () => {
    expect(getStrokeColor('#E74C3C', undefined, 30, 60)).toBe('#E74C3C')
  })

  it('returns first color when remaining time is at duration', () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF']
    const colorsTime = [60, 30, 0]
    expect(getStrokeColor(colors, colorsTime, 60, 60)).toBe('#ff0000')
  })

  it('returns last color when remaining time is 0', () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF']
    const colorsTime = [60, 30, 0]
    expect(getStrokeColor(colors, colorsTime, 0, 60)).toBe('#0000ff')
  })

  it('interpolates between colors at midpoints', () => {
    const colors = ['#FF0000', '#0000FF']
    const colorsTime = [60, 0]
    const result = getStrokeColor(colors, colorsTime, 30, 60)
    expect(result).toBe('#800080')
  })

  it('handles empty array', () => {
    expect(getStrokeColor([], undefined, 30, 60)).toBe('#3498DB')
  })

  it('handles single color array', () => {
    expect(getStrokeColor(['#E74C3C'], undefined, 30, 60)).toBe('#E74C3C')
  })

  it('auto-distributes colorsTime when not provided', () => {
    const colors = ['#FF0000', '#0000FF']
    const result = getStrokeColor(colors, undefined, 30, 60)
    expect(result).toBeDefined()
  })
})
