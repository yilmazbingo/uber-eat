import { LocationContext } from "../location/location.context";
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  ReactElement,
  useContext,
  ReactNode,
} from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";

export const RestaurantsContext = createContext<null>(null);

export const RestaurantsContextProvider = ({ children }): ReactElement => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then((results) => {
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  // useEffect(() => {
  //   if (location) {
  //     const locationString = `${location.lat},${location.lng}`;
  //     console.log("location.lat000000000000000000000", location.lat);
  //     retrieveRestaurants(locationString);
  //   }
  // }, [location]);
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
