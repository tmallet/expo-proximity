import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core'

import ExpoProximityModule from './ExpoProximityModule'

import { ProximityStateEvent } from './ExpoProximity.types'
import { useEffect, useState } from 'react'

const ProximityEventEmitter = new EventEmitter(ExpoProximityModule)

export async function isAvailableAsync(): Promise<boolean> {
  return Promise.resolve((ExpoProximityModule && ExpoProximityModule.isSupported) || false)
}

export async function getProximityStateAsync(): Promise<boolean> {
  if (!ExpoProximityModule.getProximityStateAsync) {
    return false
  }
  return await ExpoProximityModule.getProximityStateAsync()
}

export function addProximityStateListener(listener: (event: ProximityStateEvent) => void): Subscription {
  return ProximityEventEmitter.addListener('Expo.proximityStateDidChange', listener)
}

export function useProximityState(): boolean {
  const [proximityState, setProximityState] = useState(false)

  useEffect(() => {
    const listener = addProximityStateListener((event) => setProximityState(event.proximityState))
    return () => listener.remove()
  }, [])

  return proximityState
}
