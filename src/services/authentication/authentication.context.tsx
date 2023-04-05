import React, { useState, createContext, ReactElement } from "react";
import {
  Auth,
  User,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { loginRequest } from "./authentication.service";

type AuthenticationContext = {
  isAuthenticated: boolean;
  user: firebase.User | null;
  error: any;
  isLoading: boolean;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => void;
  onLogout: () => void;
};

const defaultState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
  onLogin: () => null,
  onRegister: () => null,
  onLogout: () => null,
};
export const AuthenticationContext =
  createContext<AuthenticationContext>(defaultState);

type AuthenticationContextProviderProps = {
  children: ReactElement;
};
export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((user) => {
        setUser(user.user);
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
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUser(user.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };
  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
