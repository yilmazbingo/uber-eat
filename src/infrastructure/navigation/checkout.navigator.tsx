import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { CheckoutScreen } from "@screens/checkout/checkout";
import { CheckoutSuccesScreen } from "@screens/checkout/checkout-success";
import { CheckoutErrorScreen } from "@screens/checkout/checkout-error";

export type StackNavigatorParams = {
  Checkout: undefined;
  CheckoutSuccess: undefined;
  CheckoutError: { error: string };
};

const CheckoutStack = createStackNavigator<StackNavigatorParams>();

export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator headerMode="none">
      <CheckoutStack.Screen
        name="Checkout"
        component={CheckoutScreen}
      ></CheckoutStack.Screen>
      <CheckoutStack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccesScreen}
      ></CheckoutStack.Screen>
      <CheckoutStack.Screen
        name="CheckoutError"
        component={CheckoutErrorScreen}
      ></CheckoutStack.Screen>
    </CheckoutStack.Navigator>
  );
};
