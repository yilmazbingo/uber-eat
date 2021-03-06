import React, { ReactElement, FC } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RestaurantsScreen } from "../../screens/restaurants";
import { RestaurantDetailScreen } from "../../screens/restaurant-detail";
import { IRestaurant } from "../../types/interfaces";

export type StackNavigatorParams = {
  Restaurants: undefined;
  RestaurantDetail: { restaurant: IRestaurant };
};

const RestaurantStack = createStackNavigator<StackNavigatorParams>();

interface NavigatorProps {}

export const RestaurantsNavigator: React.FC<NavigatorProps> =
  (): ReactElement => {
    return (
      <RestaurantStack.Navigator
        headerMode="none"
        screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
      >
        <RestaurantStack.Screen
          name="Restaurants"
          component={RestaurantsScreen}
        ></RestaurantStack.Screen>
        <RestaurantStack.Screen
          name="RestaurantDetail"
          component={RestaurantDetailScreen}
        ></RestaurantStack.Screen>
      </RestaurantStack.Navigator>
    );
  };
