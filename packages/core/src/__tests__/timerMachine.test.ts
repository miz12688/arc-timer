import { describe, it, expect } from 'vitest'
import { timerReducer, createInitialState } from '../engine/timerMachine'
import type { TimerState } from '../types'

describe('createInitialState', () => {
  it('creates idle state with full duration', () => {
    const state = createInitialState(60)
    expect(state.status).toBe('idle')
    expect(state.duration).toBe(60)
    expect(state.elapsed).toBe(0)
    expect(state.startedAt).toBeNull()
    expect(state.pausedAt).toBeNull()
  })

  it('creates state with initial remaining time', () => {
    const state = createInitialState(60, 30)
    expect(state.elapsed).toBe(30)
    expect(state.duration).toBe(60)
  })

  it('clamps elapsed to duration', () => {
    const state = createInitialState(60, -10)
    expect(state.elapsed).toBe(60)
  })

  it('clamps elapsed to zero', () => {
    const state = createInitialState(60, 100)
    expect(state.elapsed).toBe(0)
  })
})

describe('timerReducer', () => {
  const idle = createInitialState(60)

  describe('PLAY event', () => {
    it('transitions from idle to playing', () => {
      const next = timerReducer(idle, { type: 'PLAY' })
      expect(next.status).toBe('playing')
      expect(next.startedAt).not.toBeNull()
      expect(next.pausedAt).toBeNull()
    })

    it('no-ops when already playing', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const same = timerReducer(playing, { type: 'PLAY' })
      expect(same).toBe(playing)
    })

    it('transitions from paused to playing', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const paused = timerReducer(playing, { type: 'PAUSE' })
      const resumed = timerReducer(paused, { type: 'PLAY' })
      expect(resumed.status).toBe('playing')
      expect(resumed.startedAt).not.toBeNull()
    })

    it('transitions from completed to playing (restart)', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const completed = timerReducer(playing, { type: 'COMPLETE' })
      const restarted = timerReducer(completed, { type: 'PLAY' })
      expect(restarted.status).toBe('playing')
      expect(restarted.elapsed).toBe(0)
    })
  })

  describe('PAUSE event', () => {
    it('transitions from playing to paused', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const paused = timerReducer(playing, { type: 'PAUSE' })
      expect(paused.status).toBe('paused')
      expect(paused.pausedAt).not.toBeNull()
    })

    it('no-ops when not playing', () => {
      const same = timerReducer(idle, { type: 'PAUSE' })
      expect(same).toBe(idle)
    })
  })

  describe('COMPLETE event', () => {
    it('transitions from playing to completed', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const completed = timerReducer(playing, { type: 'COMPLETE' })
      expect(completed.status).toBe('completed')
      expect(completed.elapsed).toBe(60)
      expect(completed.startedAt).toBeNull()
    })

    it('no-ops when not playing', () => {
      const same = timerReducer(idle, { type: 'COMPLETE' })
      expect(same).toBe(idle)
    })
  })

  describe('RESET event', () => {
    it('resets to idle from any state', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const reset = timerReducer(playing, { type: 'RESET' })
      expect(reset.status).toBe('idle')
      expect(reset.elapsed).toBe(0)
      expect(reset.duration).toBe(60)
    })

    it('resets with new duration', () => {
      const reset = timerReducer(idle, { type: 'RESET', duration: 120 })
      expect(reset.duration).toBe(120)
      expect(reset.elapsed).toBe(0)
    })

    it('resets from completed state', () => {
      const playing = timerReducer(idle, { type: 'PLAY' })
      const completed = timerReducer(playing, { type: 'COMPLETE' })
      const reset = timerReducer(completed, { type: 'RESET' })
      expect(reset.status).toBe('idle')
      expect(reset.elapsed).toBe(0)
    })
  })
})
