import { useEffect, useState } from 'react'
import ExpoProximityModule from './ExpoProximityModule'
import { type NativeEventSubscription, Platform } from 'react-native'
import type { ProximityStateChangeEvent } from './ExpoProximity.types'

export async function isAvailableAsync(): Promise<boolean> {
  return Platform.OS === 'android'
    ? ExpoProximityModule.isAvailableAsync()
    : Promise.resolve(ExpoProximityModule?.isSupported ?? false)
}

export async function getProximityStateAsync(): Promise<boolean> {
  if (!ExpoProximityModule.getProximityStateAsync) {
    return false
  }
  return await ExpoProximityModule.getProximityStateAsync()
}

export function addProximityStateListener(
  listener: (event: ProximityStateChangeEvent) => void
): NativeEventSubscription {
  if (Platform.OS === 'android') {
    ExpoProximityModule.setHasListener(true)
  }
  return ExpoProximityModule.addListener('onProximityStateChange', listener)
}

export function useProximityState(): boolean {
  const [proximityState, setProximityState] = useState(false)

  useEffect(() => {
    const listener = addProximityStateListener((event) => setProximityState(event.proximityState))
    return () => {
      if (Platform.OS === 'android') {
        ExpoProximityModule.setHasListener(false)
      }
      listener.remove()
    }
  }, [])

  return proximityState
}
