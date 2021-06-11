import { LocationContext } from "../location/location.context";
import React, {
  useState,
  createContext,
  useEffect,
  ReactElement,
  useContext,
  ReactNode,
} from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";
import { IRestaurant } from "../../types/interfaces";
import { locationTransform } from "@services/location/location.service";

const defaultState = {
  restaurants: [],
  isLoading: false,
  error: null,
};
type RestaurantContext = {
  restaurants: IRestaurant[];
  isLoading: boolean;
  error: any;
};

export const RestaurantsContext =
  createContext<RestaurantContext>(defaultState);

export const RestaurantsContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  // stringifying lat and long
  const retrieveRestaurants = (loc: string) => {
    console.log(typeof loc);
    setIsLoading(true);
    setRestaurants([]);
    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then((results) => {
        setError(null);
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err in restarurant context", err);
        setError(err);
      });
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);
  return (
    <RestaurantsContext.Provider
      // value={{ restaurants: restaurants, isLoading, error }}
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
