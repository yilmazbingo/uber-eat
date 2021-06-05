import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactElement,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IRestaurant } from "../../types/interfaces";
import { ICartContext, IItem } from "./cart.context.types";

const defaultState = {
  addToCart: () => undefined,
  clearCart: () => undefined,
  restaurant: null,
  cart: [],
  sum: 0,
};
export const CartContext = createContext<ICartContext>(defaultState);

export const CartContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState<IItem[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [sum, setSum] = useState(0);

  const saveCart = async (rst: IRestaurant, crt: IItem[], uid: string) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadCart = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log("loading cart", e);
    }
  };
  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      if (restaurant) {
        saveCart(restaurant, cart, user.uid);
      }
    }
  }, [restaurant, cart, user]);
  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }

    const newSum = cart.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const add = (item: IItem, rst: IRestaurant): void => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = (): void => {
    setCart([]);
    setRestaurant(null);
  };
  return (
    <CartContext.Provider
      value={{ addToCart: add, clearCart: clear, restaurant, cart, sum }}
    >
      {children}
    </CartContext.Provider>
  );
};
