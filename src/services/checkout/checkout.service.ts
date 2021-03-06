import createStripe from "stripe-client";
import { host } from "../../utils/env";

import { stripeClientKey } from "../../../config";

const stripe = createStripe(stripeClientKey);

export interface ICardInfo {
  cvc: string;
  exp_month: string;
  exp_year: string;
  name: string;
  number: string;
}

export const cardTokenRequest = (card: ICardInfo): string => {
  // console.log("carddddddddddd", card);
  return stripe.createToken({ card });
};

export const payRequest = (token: string, amount: number, name: string) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("Something went wrong processing your payment");
    }
    return res.json();
  });
};
