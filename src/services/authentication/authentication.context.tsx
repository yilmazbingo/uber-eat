import React, { useState, createContext, ReactElement } from "react";
import * as firebase from "firebase";
import { loginRequest } from "./authentication.service";

type FavoritesContext = {
  user: firebase.auth.UserCredential | null;
  error: any;
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
};

const defaultState = {
  user: null,
  error: null,
  isLoading: false,
  onLogin: (email: string, password: string) => null,
};
export const AuthenticationContext = createContext<FavoritesContext>(
  defaultState
);

type AuthenticationContextProviderProps = {
  children: ReactElement;
};
export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.auth.UserCredential | null>(null);
  const [error, setError] = useState<any>(null);

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);

    loginRequest(email, password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
