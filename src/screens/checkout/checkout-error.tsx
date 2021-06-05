import React from "react";
import { RouteProp } from "@react-navigation/native";
import { Text } from "@components/text";
import { SafeArea } from "@components/safe-area";
import { colors } from "@infrastructure/theme/colors";
import { CartIconContainer, CartIcon } from "@components/checkout.styles";
import { StackNavigatorParams } from "@infrastructure/navigation/checkout.navigator";

type CheckoutErrorScreenProps = {
  route: RouteProp<StackNavigatorParams, "CheckoutError">;
};

export const CheckoutErrorScreen = ({ route }: CheckoutErrorScreenProps) => {
  const { error = "" } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
