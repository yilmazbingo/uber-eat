import React, { useState, createContext, ReactElement } from "react";
import * as firebase from "firebase";
import { loginRequest } from "./authentication.service";

type AuthenticationContext = {
  user: firebase.auth.UserCredential | null;
  error: any;
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => void;
};

const defaultState = {
  user: null,
  error: null,
  isLoading: false,
  onLogin: (email: string, password: string) => null,
  onRegister: (email: string, password: string, repeatedPassword: string) =>
    null,
};
export const AuthenticationContext = createContext<AuthenticationContext>(
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

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
