import { NativeModule, requireNativeModule } from 'expo'

import type { ExpoProximityModuleEvents } from './ExpoProximity.types'

declare class ExpoProximityModule extends NativeModule<ExpoProximityModuleEvents> {
  isSupported: boolean
  getProximityState(): boolean
  isActivated(): boolean
  isAvailableAsync(): Promise<boolean>
  deactivate(): Promise<void>
  activate(): Promise<void>
}

export default requireNativeModule<ExpoProximityModule>('ExpoProximity')
