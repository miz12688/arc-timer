import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCountdown } from '../useCountdown'
import { _resetForTesting } from '../engine/rafLoop'

describe('useCountdown', () => {
  beforeEach(() => {
    _resetForTesting()
    vi.useFakeTimers()
  })

  afterEach(() => {
    _resetForTesting()
    vi.useRealTimers()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60 })
    )

    expect(result.current.remainingTime).toBe(60)
    expect(result.current.elapsedTime).toBe(0)
    expect(result.current.progress).toBe(0)
    expect(result.current.isComplete).toBe(false)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.size).toBe(180)
    expect(result.current.strokeWidth).toBe(12)
  })

  it('returns correct size and strokeWidth from props', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 30, size: 100, strokeWidth: 8 })
    )

    expect(result.current.size).toBe(100)
    expect(result.current.strokeWidth).toBe(8)
  })

  it('returns valid SVG path', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60 })
    )

    expect(result.current.path).toContain('M')
    expect(result.current.path).toContain('A')
    expect(result.current.pathLength).toBeGreaterThan(0)
  })

  it('returns correct color with single color', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60, colors: '#E74C3C' })
    )

    expect(result.current.color).toBe('#E74C3C')
  })

  it('starts as not playing by default', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60 })
    )

    expect(result.current.isPlaying).toBe(false)
  })

  it('starts playing when isPlaying is true', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60, isPlaying: true })
    )

    expect(result.current.isPlaying).toBe(true)
  })

  it('handles initialRemainingTime', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60, initialRemainingTime: 30 })
    )

    expect(result.current.remainingTime).toBe(30)
    expect(result.current.elapsedTime).toBe(30)
  })

  it('handles count-up mode', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60, isCountUp: true })
    )

    expect(result.current.remainingTime).toBe(60)
    expect(result.current.elapsedTime).toBe(0)
  })

  it('returns default color when colors not specified', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60 })
    )

    expect(result.current.color).toBe('#3498DB')
  })

  it('computes strokeDashoffset', () => {
    const { result } = renderHook(() =>
      useCountdown({ duration: 60 })
    )

    expect(result.current.strokeDashoffset).toBeGreaterThanOrEqual(0)
  })
})
