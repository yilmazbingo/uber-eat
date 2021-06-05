import React, { useContext, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
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
  PaymentProcessing,
} from "@components/checkout.styles";
import { CartContext } from "@services/cart/cart.context";
import { RestaurantInfo } from "@components/restaurant-info/restaurantInfo";
import { payRequest, ICard } from "@services/checkout/checkout.service";
import { StackNavigatorParams } from "@infrastructure/navigation/checkout.navigator";

type CheckoutScreenProps = {
  navigation: StackNavigationProp<
    StackNavigatorParams,
    "CheckoutSuccess" | "CheckoutError"
  >;
};

export const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  // i could not use "" because text has to be inside Text
  const [name, setName] = useState("");
  const [card, setCard] = useState<ICard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        // console.log("Cardddd", card);
        // console.log("resulttttt", result);
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess");
      })
      .catch((error: any) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: error.message,
        });
      });
  };

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
      {isLoading && <PaymentProcessing />}
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
          {name ? (
            <CreditCardInput
              name={name}
              onSuccess={(card) => setCard(card)}
              onError={() =>
                navigation.navigate("CheckoutError", {
                  error: "Something went wrong processing your credit cart",
                })
              }
            />
          ) : (
            <></>
          )}
        </Spacer>
        <Spacer position="top" size="xxl" />
        <PayButton
          disabled={isLoading}
          icon="cash-usd"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            ClearCart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
