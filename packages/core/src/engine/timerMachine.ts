import type { TimerState, TimerEvent, TimerStatus } from '../types'

export function createInitialState(
  duration: number,
  initialRemainingTime?: number
): TimerState {
  const elapsed =
    initialRemainingTime !== undefined
      ? duration - initialRemainingTime
      : 0

  return {
    status: 'idle',
    duration,
    elapsed: Math.max(0, Math.min(elapsed, duration)),
    startedAt: null,
    pausedAt: null,
  }
}

export function timerReducer(
  state: TimerState,
  event: TimerEvent
): TimerState {
  switch (event.type) {
    case 'PLAY': {
      if (state.status === 'playing') return state

      const now = performance.now()

      if (state.status === 'completed') {
        return {
          ...state,
          status: 'playing',
          elapsed: 0,
          startedAt: now,
          pausedAt: null,
        }
      }

      return {
        ...state,
        status: 'playing',
        startedAt: now - state.elapsed * 1000,
        pausedAt: null,
      }
    }

    case 'PAUSE': {
      if (state.status !== 'playing') return state

      return {
        ...state,
        status: 'paused',
        pausedAt: performance.now(),
      }
    }

    case 'COMPLETE': {
      if (state.status !== 'playing') return state

      return {
        ...state,
        status: 'completed',
        elapsed: state.duration,
        startedAt: null,
        pausedAt: null,
      }
    }

    case 'RESET': {
      const newDuration = event.duration ?? state.duration
      return createInitialState(newDuration)
    }

    default:
      return state
  }
}

export function getStatusFromState(state: TimerState): TimerStatus {
  return state.status
}
