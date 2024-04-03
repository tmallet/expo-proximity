import { EventEmitter, Platform, Subscription } from 'expo-modules-core'

import ExpoProximityModule from './ExpoProximityModule'

import { ProximityStateEvent } from './ExpoProximity.types'
import { useEffect, useState } from 'react'

const ProximityEventEmitter = new EventEmitter(ExpoProximityModule)

export async function isAvailableAsync(): Promise<boolean> {
  return Platform.OS === 'android'
    ? ExpoProximityModule.isAvailableAsync()
    : Promise.resolve((ExpoProximityModule && ExpoProximityModule.isSupported) || false)
}

export async function getProximityStateAsync(): Promise<boolean> {
  if (!ExpoProximityModule.getProximityStateAsync) {
    return false
  }
  return await ExpoProximityModule.getProximityStateAsync()
}

export function addProximityStateListener(listener: (event: ProximityStateEvent) => void): Subscription {
  if (Platform.OS === 'android') {
    ExpoProximityModule.setHasListener(true)
  }
  return ProximityEventEmitter.addListener('Expo.proximityStateDidChange', listener)
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
