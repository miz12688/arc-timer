import '@testing-library/jest-dom/vitest'

let rafCallbacks: Array<(timestamp: number) => void> = []
let rafId = 0
let currentTime = 0

global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  rafCallbacks.push(callback as (timestamp: number) => void)
  return ++rafId
}

global.cancelAnimationFrame = (id: number): void => {
  // no-op for testing
}

global.performance = {
  ...global.performance,
  now: () => currentTime,
}

export function advanceTimersByTime(ms: number): void {
  currentTime += ms
  const callbacks = [...rafCallbacks]
  rafCallbacks = []
  callbacks.forEach((cb) => cb(currentTime))
}

export function resetTestTimers(): void {
  rafCallbacks = []
  rafId = 0
  currentTime = 0
}

export function getCurrentTime(): number {
  return currentTime
}

export function setCurrentTime(time: number): void {
  currentTime = time
}

export function flushRafCallbacks(): void {
  const callbacks = [...rafCallbacks]
  rafCallbacks = []
  callbacks.forEach((cb) => cb(currentTime))
}
