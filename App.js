import { StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

export default function App() {
  return (

    <View style={styles.container}>
      <Text>You're in</Text>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
