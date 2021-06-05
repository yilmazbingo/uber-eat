import { IRestaurant } from "../../types/interfaces";

export interface IItem {
  item: string;
  price: number;
}

export interface ICartContext {
  addToCart: (item: IItem, rst: IRestaurant) => void;
  clearCart: () => void;
  restaurant: IRestaurant | null;
  cart: IItem[];
  sum: number;
}
