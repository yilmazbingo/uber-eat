import camelize from "camelize";
// import { host } from "@utils/env";
import { host, isMock } from "../../utils/env";
import { IRestaurant } from "../../types/interfaces";

// stringified of lat and long is location type
export const restaurantsRequest = (location: string) => {
  // console.log("location", typeof location, location);

  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => {
      // console.log(res);
      return res.json();
    }
  );
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
      // opening_hours got camelized
      isOpenNow: restaurant.openingHours && restaurant.openingHours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  // console.log("mappedRes", mappedResults);
  const camelizedResults = camelize(mappedResults);
  // console.log("camelizedResults", camelizedResults);
  return camelizedResults;
};
