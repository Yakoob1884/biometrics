
import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  async function unlock() {
    // 1. Undersøg om telefonen understøtter biometri
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    // 2. Undersøg om brugeren har opsat Face ID/fingeraftryk
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometrisk login er ikke tilgængeligt');
      return;
    }

    // 3. Bed telefonen om at godkende brugeren
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Lås dine noter op',
      disableDeviceFallback: true,
    });

    // 4. Giv adgang hvis godkendelsen lykkedes
    if (result.success) {
      setIsUnlocked(true);
    } else {
      Alert.alert('Adgang ikke godkendt');
    }
  }

  return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {isUnlocked ? (
            <>
              <Text>Velkommen til dine private noter!</Text>
              <Button
                  title="Lås igen"
                  onPress={() => setIsUnlocked(false)}
              />
            </>
        ) : (
            <>
              <Text>Appen er låst</Text>
              <Button title="Lås op" onPress={unlock} />
            </>
        )}
      </View>
  );
}
