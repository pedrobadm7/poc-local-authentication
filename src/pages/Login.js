import React, { useEffect, useState } from "react";

import Logo from "../assets/img/Logo-neon.png";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/core";

export default function Login() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
  }, []);

  const fallBackDefaultAuth = () => {
    console.log("Fallback to default auth");
  };

  const alertComponent = (title, message, btnText, btnFunc) => {
    return Alert.alert(title, message), [
      {
        text: btnText,
        onPress: btnFunc,
      },
    ];
  };

  const handleBiometricAuth = async () => {
    const isBIometricAvaliable = await LocalAuthentication.hasHardwareAsync();

    if (!isBIometricAvaliable) {
      return alertComponent(
        "Please, enter with your e-mail and recovery phrase",
        "Biometric authentication is not supported",
        "Ok",
        () => fallBackDefaultAuth()
      );
    }

    let supportedBiometrics;

    if (isBIometricAvaliable)
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

    const savedBiometric = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometric) {
      return alertComponent(
        "Please, enter with your e-mail and recovery phrase",
        "Biometric authentication is not supported",
        "Ok",
        () => fallBackDefaultAuth()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with your biometric",
      fallbackLabel: "Enter with your e-mail and recovery phrase",
      disableDeviceFallback: true,
      cancelLabel: "Cancel",
    });

    if (biometricAuth) {
      console.log("Biometric auth success");
      navigation.navigate("Welcome");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Logo} resizeMode="contain" />
      <View style={styles.containerText}>
        <Text style={styles.text}>Good Night,</Text>
        <Text style={styles.textUsername}> Pedro</Text>
      </View>

      <TouchableOpacity style={styles.finger} onPress={handleBiometricAuth}>
        <Ionicons name="finger-print" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272134",
    alignItems: "center",
    justifyContent: "space-around",
  },
  containerText: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  textUsername: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 180,
  },
  finger: {
    height: 70,
    width: 70,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#F4AE64",
    alignItems: "center",
    justifyContent: "center",
  },
});
