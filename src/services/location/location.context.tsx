import React, { useState, createContext, useEffect, ReactNode } from "react";
import { locationRequest, locationTransform } from "./location.service";

const defaultState = {
  isLoading: false,
  error: null,
  location: null,
  search: (searchKeyword: string) => undefined,
  keyword: "",
};

interface Location {
  lat: number;
  lng: number;
  viewport: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  };
}

type LocationContext = {
  isLoading: boolean;
  error: any;
  location: Location | null;
  search: (searchKeyword: string) => void;
  keyword: string;
};

export const LocationContext = createContext<LocationContext>(defaultState);

export const LocationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [keyword, setKeyword] = useState("istanbul");
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      return;
    }

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log("err in location request", err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
