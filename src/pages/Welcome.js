import React from "react";
import Logo from "../assets/img/logo.png";
import Card from "../assets/img/cardimg.png";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions
} from "react-native";

export default function Welcome() {
  return (
    <SafeAreaView style={styled.container}>
      <Image style={styled.image} source={Logo} resizeMode="contain" />
      <Image style={styled.card} source={Card} resizeMode="contain" />
    </SafeAreaView>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center"
  },
  image: {
    width: 150
  },
  text: {
    color: "#fff"
  },
  card: {
    height: Dimensions.get("window").width * 0.6
  }
});
