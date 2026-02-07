import { useRef, useEffect } from 'react'

export interface AnnouncementConfig {
  announceInterval: number
  duration: number
  thresholds?: number[]
}

const DEFAULT_THRESHOLDS_PERCENT = [50, 25, 10]
const DEFAULT_THRESHOLDS_SECONDS = [5]

export function getAnnouncementText(
  remainingTime: number,
  isCountUp: boolean
): string {
  if (remainingTime <= 0) {
    return isCountUp ? 'Timer complete' : 'Time is up'
  }

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  if (minutes > 0) {
    return isCountUp
      ? `${minutes} minutes and ${seconds} seconds elapsed`
      : `${minutes} minutes and ${seconds} seconds remaining`
  }

  return isCountUp
    ? `${seconds} seconds elapsed`
    : `${seconds} seconds remaining`
}

export function shouldAnnounce(
  remainingTime: number,
  prevRemainingTime: number,
  duration: number,
  announceInterval: number
): boolean {
  if (remainingTime === prevRemainingTime) return false

  // Announce at completion
  if (remainingTime <= 0 && prevRemainingTime > 0) return true

  // Announce at regular intervals
  if (announceInterval > 0) {
    const prevBucket = Math.floor(prevRemainingTime / announceInterval)
    const currentBucket = Math.floor(remainingTime / announceInterval)
    if (prevBucket !== currentBucket) return true
  }

  // Announce at percentage thresholds
  for (const percent of DEFAULT_THRESHOLDS_PERCENT) {
    const threshold = Math.floor(duration * (percent / 100))
    if (
      prevRemainingTime > threshold &&
      remainingTime <= threshold
    ) {
      return true
    }
  }

  // Announce at specific second thresholds
  for (const threshold of DEFAULT_THRESHOLDS_SECONDS) {
    if (
      prevRemainingTime > threshold &&
      remainingTime <= threshold
    ) {
      return true
    }
  }

  return false
}

export function useAnnouncer(
  remainingTime: number,
  duration: number,
  announceInterval: number,
  isCountUp: boolean
): {
  announcement: string
  announcerProps: {
    role: 'status'
    'aria-live': 'polite'
    'aria-atomic': true
    style: React.CSSProperties
  }
} {
  const prevTimeRef = useRef(remainingTime)
  const announcementRef = useRef('')

  useEffect(() => {
    if (
      shouldAnnounce(
        remainingTime,
        prevTimeRef.current,
        duration,
        announceInterval
      )
    ) {
      announcementRef.current = getAnnouncementText(
        remainingTime,
        isCountUp
      )
    }
    prevTimeRef.current = remainingTime
  }, [remainingTime, duration, announceInterval, isCountUp])

  return {
    announcement: announcementRef.current,
    announcerProps: {
      role: 'status' as const,
      'aria-live': 'polite' as const,
      'aria-atomic': true as const,
      style: {
        position: 'absolute' as const,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden' as const,
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap' as const,
        borderWidth: 0,
      },
    },
  }
}
