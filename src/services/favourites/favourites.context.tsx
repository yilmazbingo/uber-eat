import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactElement,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IRestaurant } from "../../types/interfaces";

const defaultState = {
  favourites: [],
  addToFavourites: () => null,
  removeFromFavourites: () => null,
};

type FavouritesContext = {
  favourites: IRestaurant[];
  addToFavourites: (restaurant: IRestaurant) => void;
  removeFromFavourites: (restaurant: IRestaurant) => void;
};
export const FavouritesContext = createContext<FavouritesContext>(defaultState);

export const FavouritesContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { user } = useContext(AuthenticationContext);

  const [favourites, setFavorites] = useState<IRestaurant[] | []>([]);

  const saveFavourites = async (value: any, uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e.message);
    }
  };
  const add = (restaurant: IRestaurant) => {
    setFavorites([...favourites, restaurant]);
  };

  const remove = (restaurant: IRestaurant) => {
    const newFavourites = favourites.filter((r) => {
      console.log("rrrrr", r);
      return r.placeId !== restaurant.placeId;
    });
    setFavorites(newFavourites);
  };

  useEffect(() => {
    user && loadFavourites(user.uid);
  }, [user]);

  useEffect(() => {
    user && saveFavourites(favourites, user.uid);
  }, [favourites, user]);
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
