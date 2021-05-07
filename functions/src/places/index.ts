import { Request, Response } from "firebase-functions";
import { mocks, addMockImage } from "./mock";

export const placesRequest = (request: Request, response: Response) => {
  const { location } = request.query;
  // @ts-ignore
  const data = mocks[location];
  if (data) {
    data.results = data.results.map(addMockImage);
  }

  response.json(data);
};
