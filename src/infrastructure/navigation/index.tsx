import React, { ReactElement, useContext } from "react";
import { View, Text } from "react-native";
import { AppNavigator } from "./app.navigator";
import { AuthenticationContext } from "@services/authentication/authentication.context";
import { NavigationContainer } from "@react-navigation/native";
import { AccountNavigator } from "./account.navigator";

export const Navigation = (): ReactElement => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
