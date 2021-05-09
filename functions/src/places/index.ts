import { Client } from "@googlemaps/google-maps-services-js";
import * as functions from "firebase-functions";
import { mocks, addMockImage } from "./mock";

const addGoogleImage = (restaurant: any) => {
  console.log("restaurnat", restaurant);
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ];
  return restaurant;
};

export const placesRequest = (
  request: functions.Request,
  response: functions.Response,
  client: Client
): void | any => {
  //     @ts-ignores
  const { location, mock }: { location: string; mock: string } = request.query;
  if (mock === "true") {
    // @ts-ignore
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }

    return response.json(data);
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 15000,
        type: "restaurant",
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch((error) => {
      response.status(400);
      return response.send(error.response.data.error_message);
    });
};
