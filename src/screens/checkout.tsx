import React, { useContext, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { Text } from "@components/text";
import { Spacer } from "@components/spacer";
import { CreditCardInput } from "@components/creditCardInput";
import { SafeArea } from "@components/safe-area";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
} from "@components/checkout.styles";
import { CartContext } from "@services/cart/cart.context";
import { RestaurantInfo } from "@components/restaurant-info/restaurantInfo";

export const CheckoutScreen = () => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  // i could not use "" because text has to be inside Text
  const [name, setName] = useState<string | null>(null);

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfo restaurant={restaurant} />
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => {
              return <List.Item title={` ${item}-${price / 100}`} />;
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            if (t.length) {
              setName(t);
            } else {
              setName(null);
            }
          }}
        />
        <Spacer position="top" size="large">
          {name ? <CreditCardInput name={name} /> : <></>}
        </Spacer>
        <Spacer position="top" size="xxl" />
        <PayButton icon="cash-usd" mode="contained" onPress={}>
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton icon="cart-off" mode="contained" onPress={clearCart}>
            ClearCart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
