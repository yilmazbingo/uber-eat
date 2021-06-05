import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "@screens/account/account";
import { LoginScreen } from "@screens/account/login";
import { RegisterScreen } from "@screens/account/register";

export type StackNavigatorParams = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
