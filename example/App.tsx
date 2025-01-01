import { Button, StyleSheet, Text, View } from 'react-native'

import {
  addProximityStateListener,
  deactivate,
  activate,
  isAvailableAsync,
  useProximity,
  isActivated,
} from 'expo-proximity'
import { useEffect, useState } from 'react'

export default function App() {
  const { proximityState, isActivated: isSensorActivated } = useProximity()
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    const listener = addProximityStateListener(console.log)
    isAvailableAsync().then(setIsAvailable)
    return () => {
      listener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Proximity state: {String(proximityState)}</Text>
      <Text>Proximity sensor available: {String(isAvailable)}</Text>
      <Text>Proximity sensor activated: {String(isSensorActivated)}</Text>
      <Button onPress={() => deactivate()} title="Deactivate sensor" />
      <Button onPress={() => activate()} title="Activate sensor" />
      <Button onPress={() => alert(isActivated())} title="Alert proximity sensor activation" />
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
