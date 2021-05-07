import { Request, Response } from "firebase-functions";

import { locations as locationsMock } from "./geocode.mock";

export const geocodeRequest = (request: Request, response: Response) => {
  //   @ts-ignores
  const { city } = request.query;
  //@ts-ignore
  const locationMock = locationsMock[city.toLowerCase()];

  // response.json(locationMock);
  response.send(locationMock);
};
