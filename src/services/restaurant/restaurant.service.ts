import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const restaurantsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

// export const restaurantsTransform = ({ results = [] }) => {
//   const mappedResult = results.map((result) => {
//     console.log("restaurant item", result);
//     result.photos = result.photos.map((p) => {
//       return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
//     });
//     return {
//       ...result,
//       isClosedTemporarily
//       isClosedTemporarily: result.business_status === "CLOSED_TEMPORARILY",
//       isOpenNow: result.opening_hours && result.opening_hours.open_now,
//     };
//   });
//   return camelize(mappedResult);
// };
export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    // console.log("restaurnat.photos", restaurants.photos);
    restaurant.photos = restaurant.photos.map((p) => {
      console.log("ppp", p);
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
      // return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
