import * as functions from "firebase-functions";
import { Client } from "@googlemaps/google-maps-services-js";
import Stripe from "stripe";
import { geocodeRequest } from "./geocode";
import { placesRequest } from "./places";
import { payRequest } from "./pay";

//  client will make the api call.
const googleClient = new Client({});

// use the secret key
// firebase functions:config:get > .runtimeconfig.json will set all the configs
const stripeClient = new Stripe(functions.config().stripe.key, {
  apiVersion: "2020-08-27",
});

export const geocode = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    geocodeRequest(request, response, googleClient);
  }
);

export const placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

export const pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
