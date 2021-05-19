import createStripe from "stripe-client";

import { stripeClientKey } from "../../../config";

const stripe = createStripe(stripeClientKey);

export const cardTokenRequest = (card) => stripe.createToken({ card });
