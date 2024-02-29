import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from "./styles";
import { useEffect, useState } from "react";

export default function App() {
  const [isAuth, setAuth] = useState(false);

  async function verifyAuth(){
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
    
    
  }

  async function handleAuth(){
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if(!isBiometricEnrolled){
      return Alert.alert('Login', 'Nenhuma biometria encontrada, por favor, cadastre sua biometria e retorne');
    }

    // android ou password padrao no ios
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida!'
    });

    setAuth(auth.success);
    
  }

  useEffect(() => {
    verifyAuth();
  }, [])

  return (
    <View style={styles.container}>
      <Text>usuario conectado: {isAuth ? "Sim" : "Não"}</Text>
      <Button title="Entrar" onPress={handleAuth} />
    </View>
  );
}
