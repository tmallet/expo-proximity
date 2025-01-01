export type ProximityStateChangeEvent = {
  proximityState: boolean
}

export type ExpoProximityModuleEvents = {
  onProximityStateChange(event: ProximityStateChangeEvent): void
}
