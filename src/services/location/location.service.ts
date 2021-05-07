import camelize from "camelize";
import { locations } from "./location.mock";
import axios from "axios";
import { host } from "@utils/env";

export const locationRequest = (searchTerm) => {
  console.log("search term", searchTerm);
  return fetch(`${host}/geocode?city=${searchTerm}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.error("error in fetching", error));
};

// export const locationRequest = (searchTerm) => {
//   return axios
//     .get(
//       `http://localhost:5001/restaurant-86b62/us-central1/geocode?city=${searchTerm}`
//     )
//     .then((res) => {
//       return res.data;
//     })
//     .catch((error) => console.error("error in fetching", error));
// };
export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
