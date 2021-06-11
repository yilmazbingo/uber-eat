import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "@screens/map";
import { CheckoutNavigator } from "./checkout.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { RestaurantsContextProvider } from "@services/restaurant/restaurant.context";
import { LocationContextProvider } from "@services/location/location.context";
import { FavouritesContextProvider } from "@services/favourites/favourites.context";
import { CartContextProvider } from "@services/cart/cart.context";
import { StackNavigatorParams as RestaurantStackNavigatorParams } from "./restaurants.navigator";
import { StackNavigatorParams as SettingsStackNavigatorParams } from "./settings.navigator";
import { StackNavigatorParams as CheckoutStackNavigatorParams } from "./checkout.navigator";

export type StackNavigatorParams = {
  Restaurants: undefined;
  Map: undefined;
  Checkout: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<StackNavigatorParams>();

type Keys = "Restaurants" | "Map" | "Checkout" | "Settings";
type Values = "md-restaurant" | "md-map" | "md-card" | "md-settings";

const TAB_ICON: Record<Keys, Values> = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Checkout: "md-card",
  Settings: "md-settings",
};

type NavigatorParams =
  | RestaurantStackNavigatorParams
  | SettingsStackNavigatorParams
  | CheckoutStackNavigatorParams;
const createScreenOptions = ({
  route,
}: {
  route: RouteProp<StackNavigatorParams, Keys>;
}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

// this is where we should be mounting Favourites,Location and Restaurant Provider
// when they were at app level, they were saved in memory, so users could have same favorites
export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Checkout" component={CheckoutNavigator} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
