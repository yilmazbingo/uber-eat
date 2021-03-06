import React, { useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SettingsScreen } from "@screens/settigs";
import { FavouritesScreen } from "@screens/favourites";
import { CameraScreen } from "@screens/camera";

export type StackNavigatorParams = {
  Settings: undefined;
  Favourites: undefined;
  Camera: undefined;
};
const SettingsStack = createStackNavigator<StackNavigatorParams>();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{ header: () => null }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
