import { StyleSheet, Text, View } from 'react-native';

import * as ExpoProximity from 'expo-proximity';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoProximity.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
