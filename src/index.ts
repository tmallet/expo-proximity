import { useEffect, useState } from 'react'
import ExpoProximityModule from './ExpoProximityModule'
import { type NativeEventSubscription, Platform } from 'react-native'
import type { ProximityStateChangeEvent, UseProximity } from './ExpoProximity.types'

export async function isAvailableAsync(): Promise<boolean> {
  return Platform.OS === 'android'
    ? ExpoProximityModule.isAvailableAsync()
    : Promise.resolve(ExpoProximityModule?.isSupported ?? false)
}

export function getProximityState(): boolean {
  if (!ExpoProximityModule.getProximityState) {
    return false
  }
  return ExpoProximityModule.getProximityState()
}

export function isActivated(): boolean {
  if (!ExpoProximityModule.isActivated) {
    return false
  }
  return ExpoProximityModule.isActivated()
}

export function addProximityStateListener(
  listener: (event: ProximityStateChangeEvent) => void
): NativeEventSubscription {
  if (Platform.OS === 'android') {
    ExpoProximityModule.setHasListener(true)
  }
  return ExpoProximityModule.addListener('onProximityStateChange', listener)
}

export function useProximity(): UseProximity {
  const [proximityState, setProximityState] = useState(getProximityState())
  const [isActivatedState, setIsActivatedState] = useState(isActivated())

  useEffect(() => {
    const proximityStateListener = addProximityStateListener((event) => setProximityState(event.proximityState))
    const proximitySensorActivationListener = ExpoProximityModule.addListener(
      'onProximitySensorActivationChange',
      (event) => setIsActivatedState(event.isActivated)
    )
    return () => {
      if (Platform.OS === 'android') {
        ExpoProximityModule.setHasListener(false)
      }
      proximityStateListener.remove()
      proximitySensorActivationListener.remove()
    }
  }, [])

  return { proximityState, isActivated: isActivatedState }
}

export function deactivate(): Promise<void> {
  if (!ExpoProximityModule.deactivate) {
    return Promise.resolve()
  }
  return ExpoProximityModule.deactivate()
}

export function activate(): Promise<void> {
  if (!ExpoProximityModule.activate) {
    return Promise.resolve()
  }
  return ExpoProximityModule.activate()
}
