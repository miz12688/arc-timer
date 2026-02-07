type TickCallback = (timestamp: number) => void

const subscribers = new Map<string, TickCallback>()
let rafId: number | null = null
let isRunning = false

function tick(timestamp: number): void {
  subscribers.forEach((cb) => {
    try {
      cb(timestamp)
    } catch (_e) {
      // Prevent one subscriber from breaking others
    }
  })

  if (subscribers.size > 0) {
    rafId = requestAnimationFrame(tick)
  } else {
    isRunning = false
    rafId = null
  }
}

function startLoop(): void {
  if (isRunning) return
  isRunning = true
  rafId = requestAnimationFrame(tick)
}

function stopLoop(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  isRunning = false
}

export function subscribe(id: string, callback: TickCallback): () => void {
  subscribers.set(id, callback)

  if (subscribers.size === 1) {
    startLoop()
  }

  return () => {
    subscribers.delete(id)
    if (subscribers.size === 0) {
      stopLoop()
    }
  }
}

export function getSubscriberCount(): number {
  return subscribers.size
}

export function isLoopRunning(): boolean {
  return isRunning
}

export function _resetForTesting(): void {
  subscribers.clear()
  stopLoop()
}
