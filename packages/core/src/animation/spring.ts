import type { SpringConfig, EasingFn } from '../types'

interface SpringState {
  position: number
  velocity: number
}

function springStep(
  state: SpringState,
  stiffness: number,
  damping: number,
  mass: number,
  dt: number
): SpringState {
  // RK4 integration for damped harmonic oscillator
  function acceleration(pos: number, vel: number): number {
    return (-stiffness * (pos - 1) - damping * vel) / mass
  }

  // k1
  const k1v = acceleration(state.position, state.velocity)
  const k1x = state.velocity

  // k2
  const k2v = acceleration(
    state.position + k1x * dt * 0.5,
    state.velocity + k1v * dt * 0.5
  )
  const k2x = state.velocity + k1v * dt * 0.5

  // k3
  const k3v = acceleration(
    state.position + k2x * dt * 0.5,
    state.velocity + k2v * dt * 0.5
  )
  const k3x = state.velocity + k2v * dt * 0.5

  // k4
  const k4v = acceleration(
    state.position + k3x * dt,
    state.velocity + k3v * dt
  )
  const k4x = state.velocity + k3v * dt

  const newPosition =
    state.position + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x)
  const newVelocity =
    state.velocity + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v)

  return { position: newPosition, velocity: newVelocity }
}

export function createSpringEasing(config: SpringConfig): EasingFn {
  const tension = config.tension ?? 170
  const friction = config.friction ?? 26
  const mass = config.mass ?? 1

  // Pre-compute spring trajectory
  const samples: number[] = []
  const sampleCount = 1000
  const dt = 0.001 // 1ms steps

  let state: SpringState = { position: 0, velocity: 0 }
  let totalTime = 0
  const threshold = 0.0001

  // Simulate until settled
  for (let i = 0; i < 10000; i++) {
    state = springStep(state, tension, friction, mass, dt)
    totalTime += dt

    if (
      Math.abs(state.position - 1) < threshold &&
      Math.abs(state.velocity) < threshold
    ) {
      break
    }
  }

  const settleDuration = totalTime

  // Re-simulate and sample at regular intervals
  state = { position: 0, velocity: 0 }
  for (let i = 0; i <= sampleCount; i++) {
    const targetTime = (i / sampleCount) * settleDuration

    while (totalTime < targetTime) {
      state = springStep(state, tension, friction, mass, dt)
      totalTime += dt
    }

    samples.push(state.position)
    if (i === 0) {
      totalTime = 0
      state = { position: 0, velocity: 0 }
    }
  }

  // Re-build properly: sequential simulation
  const properSamples: number[] = []
  state = { position: 0, velocity: 0 }

  for (let i = 0; i <= sampleCount; i++) {
    const stepsPerSample = Math.ceil(settleDuration / dt / sampleCount)
    for (let j = 0; j < stepsPerSample; j++) {
      state = springStep(state, tension, friction, mass, dt)
    }
    properSamples.push(Math.max(0, Math.min(state.position, 1.5)))
  }

  return (t: number): number => {
    if (t <= 0) return 0
    if (t >= 1) return 1

    const index = t * sampleCount
    const lower = Math.floor(index)
    const upper = Math.min(Math.ceil(index), sampleCount)
    const fraction = index - lower

    const lowerVal = properSamples[lower] ?? 0
    const upperVal = properSamples[upper] ?? 1

    return lowerVal + (upperVal - lowerVal) * fraction
  }
}
