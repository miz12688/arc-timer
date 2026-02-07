import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  subscribe,
  getSubscriberCount,
  isLoopRunning,
  _resetForTesting,
} from '../engine/rafLoop'

describe('rafLoop', () => {
  beforeEach(() => {
    _resetForTesting()
  })

  it('starts loop on first subscribe', () => {
    const cb = vi.fn()
    subscribe('test-1', cb)
    expect(getSubscriberCount()).toBe(1)
    expect(isLoopRunning()).toBe(true)
  })

  it('stops loop when last subscriber unsubscribes', () => {
    const cb = vi.fn()
    const unsub = subscribe('test-1', cb)
    expect(isLoopRunning()).toBe(true)

    unsub()
    expect(getSubscriberCount()).toBe(0)
    expect(isLoopRunning()).toBe(false)
  })

  it('handles multiple subscribers', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    const unsub1 = subscribe('test-1', cb1)
    const unsub2 = subscribe('test-2', cb2)

    expect(getSubscriberCount()).toBe(2)
    expect(isLoopRunning()).toBe(true)

    unsub1()
    expect(getSubscriberCount()).toBe(1)
    expect(isLoopRunning()).toBe(true)

    unsub2()
    expect(getSubscriberCount()).toBe(0)
    expect(isLoopRunning()).toBe(false)
  })

  it('replaces callback for same id', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()
    subscribe('test-1', cb1)
    subscribe('test-1', cb2)

    expect(getSubscriberCount()).toBe(1)
  })

  it('returns unsubscribe function', () => {
    const cb = vi.fn()
    const unsub = subscribe('test-1', cb)
    expect(typeof unsub).toBe('function')
  })
})
