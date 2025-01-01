# expo-proximity

Provides access to the system's proximity sensor.

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/proximity.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/proximity/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, run following command:

```
npx expo install expo-proximity
```

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-proximity
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.

### Configure for Android

# API

```ts
import {
  isAvailableAsync,
  getProximityState,
  isActivated,
  addProximityStateListener,
  deactivate,
  activate,
  useProximity,
} from 'expo-proximity'
```

# Hooks

### `useProximity()`

```ts
const { proximityState, isActivated } = useProximity()
```

# Methods

### `getProximityState()`

Get if an object is near the sensor or not.

Returns: `boolean`

### `isActivated()`

Get if the sensor is activated or not.

Returns: `boolean`

### `addProximityStateListener(listener: (event: ProximityStateChangeEvent) => void)`

Method to add a listener on proximity state change event.

Returns: `NativeEventSubscription`

### `deactivate()`

Method to deactivate the sensor.

Returns: `Promise<void>`

### `activate()`

Method to activate the sensor.

Returns: `Promise<void>`

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
