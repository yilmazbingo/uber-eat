import * as functions from "firebase-functions";
import { Client } from "@googlemaps/google-maps-services-js";

import { locations as locationsMock } from "./geocode.mock";

export const geocodeRequest = (
  request: functions.Request,
  response: functions.Response,
  client: Client
): void | any => {
  //@ts-ignores
  const { city, mock }: { city: string; mock: string } = request.query;
  // just "mock" would be true whatever string we pass
  if (mock === "true") {
    //@ts-ignore
    const locationMock = locationsMock[city.toLowerCase()];

    // response.json(locationMock);
    return response.send(locationMock);
  }
  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((error) => {
      response.status(400);
      response.send(error.response.data.error_message);
    });
};
