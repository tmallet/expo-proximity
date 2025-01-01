import { StyleSheet, Text, View } from 'react-native'

import { addProximityStateListener, isAvailableAsync, useProximityState } from 'expo-proximity'
import { useEffect, useState } from 'react'

export default function App() {
  const proximityState = useProximityState()
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
