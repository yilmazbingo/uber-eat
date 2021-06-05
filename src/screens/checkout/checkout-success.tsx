import React from "react";
import { Text } from "@components/text";
import { SafeArea } from "@components/safe-area";
import { CartIconContainer, CartIcon } from "@components/checkout.styles";

export const CheckoutSuccesScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
