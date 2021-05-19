import camelize from "camelize";

// import { host } from "@utils/env";
import { host, isMock } from "../../utils/env";
import { IPlace } from "../../types/interfaces";

export const locationRequest = (searchTerm: string) => {
  console.log("search term", searchTerm);
  return fetch(`${host}/geocode?city=${searchTerm}$mock=${isMock}`)
    .then((response) => {
      // console.log("res in localtin", response);
      return response.json();
    })
    .catch((error) => console.error("error in fetching", error));
};

export const locationTransform = (result: IPlace) => {
  console.log("result in location transform", result.status);
  const formattedResponse: IPlace = camelize(result);
  // console.log("resultsssss", result);
  const { geometry } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
