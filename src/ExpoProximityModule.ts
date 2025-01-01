import { NativeModule, requireNativeModule } from 'expo'

import type { ExpoProximityModuleEvents } from './ExpoProximity.types'

declare class ExpoProximityModule extends NativeModule<ExpoProximityModuleEvents> {
  isSupported: boolean
  isAvailableAsync(): Promise<boolean>
  getProximityStateAsync(): Promise<boolean>
}

export default requireNativeModule<ExpoProximityModule>('ExpoProximity')
