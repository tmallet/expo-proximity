import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoProximity.web.ts
// and on native platforms to ExpoProximity.ts
import ExpoProximityModule from './ExpoProximityModule';
import ExpoProximityView from './ExpoProximityView';
import { ChangeEventPayload, ExpoProximityViewProps } from './ExpoProximity.types';

// Get the native constant value.
export const PI = ExpoProximityModule.PI;

export function hello(): string {
  return ExpoProximityModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoProximityModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoProximityModule ?? NativeModulesProxy.ExpoProximity);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoProximityView, ExpoProximityViewProps, ChangeEventPayload };
