import { StyleSheet, Text, View } from 'react-native'

import { useProximityState } from 'expo-proximity'

export default function App() {
  const proximityState = useProximityState()

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
