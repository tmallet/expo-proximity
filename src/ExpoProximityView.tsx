import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoProximityViewProps } from './ExpoProximity.types';

const NativeView: React.ComponentType<ExpoProximityViewProps> =
  requireNativeViewManager('ExpoProximity');

export default function ExpoProximityView(props: ExpoProximityViewProps) {
  return <NativeView {...props} />;
}
