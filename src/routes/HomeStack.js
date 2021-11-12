import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer initialRoute="Login">
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "#fff" }
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
