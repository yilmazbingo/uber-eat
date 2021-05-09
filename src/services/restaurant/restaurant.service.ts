import { mocks, mockImages } from "../../../functions/src/places/mock";
import camelize from "camelize";
// import { host } from "@utils/env";
import { host } from "../../utils/env";
import { IRestaurant } from "../../types/interfaces";

export const restaurantsRequest = (location: string) => {
  // console.log("location", typeof location);
  return fetch(`${host}/placesNearby?location=${location}`).then((res) => {
    // console.log(res);
    return res.json();
  });
};

export const restaurantsTransform = ({
  results = [],
}: {
  results: IRestaurant[];
}) => {
  const mappedResults = results.map((restaurant) => {
    // console.log("restaurant", restaurant);
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
