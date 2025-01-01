export type ProximityStateChangeEvent = {
  proximityState: boolean
}

export type ProximitySensorActivationChangeEvent = {
  isActivated: boolean
}

export type UseProximity = {
  proximityState: boolean
  isActivated: boolean
}

export type ExpoProximityModuleEvents = {
  onProximityStateChange(event: ProximityStateChangeEvent): void
  onProximitySensorActivationChange(event: ProximitySensorActivationChangeEvent): void
}
