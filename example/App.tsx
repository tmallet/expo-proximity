import { Button, StyleSheet, Text, View } from 'react-native'

import * as ExpoProximity from 'expo-proximity'

export default function App() {
  const proximityState = ExpoProximity.useProximityState()

  return (
    <View style={styles.container}>
      <Text>Proximity: {String(proximityState)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
