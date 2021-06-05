import * as functions from "firebase-functions";
import Stripe from "stripe";

export const payRequest = (
  request: functions.Request,
  response: functions.Response,
  stripeClient: Stripe
) => {
  const body = JSON.parse(request.body);
  const { token, amount } = body;
  // name is linked to the token.
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      // type-script defintion is wrong. "card" does not exist
      // @ts-ignore
      payment_method_data: { type: "card", card: { token } },
      confirm: true,
    })
    .then((paymentIntent) => {
      response.json(paymentIntent);
    })
    .catch((error) => {
      console.log(error.message);
      response.status(400);
      response.send("Something went wrong with your payment");
    });
};
