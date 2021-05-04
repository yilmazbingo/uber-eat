import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

const defaultState = {
  favourites: [],
  addToFavourites: () => null,
  removeFromFavourites: () => null,
};

type FavouritesContext = {
  favourites: any[];
  addToFavourites: (restaurant: any) => void;
  removeFromFavourites: (restaurant: any) => void;
};
export const FavouritesContext = createContext<FavouritesContext>(defaultState);

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [favourites, setFavorites] = useState([]);

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
  const add = (restaurant) => {
    setFavorites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (r) => r.placeId !== restaurant.placeId
    );
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
