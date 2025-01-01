# expo-proximity

Provides access to the system's proximity sensor.

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/proximity.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/proximity/)

# Installation in managed Expo projects

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

# Usage

```ts
const proximityState: boolean = useProximityState()
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
