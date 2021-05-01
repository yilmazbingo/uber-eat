import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsContextProvider } from "./src/services/restaurant/restaurant.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyB_DJXVjvGdmIm2GA9dhGdErWsP_tEvpkY",
  authDomain: "restaurant-86b62.firebaseapp.com",
  projectId: "restaurant-86b62",
  storageBucket: "restaurant-86b62.appspot.com",
  messagingSenderId: "984831762801",
  appId: "1:984831762801:web:07abc5e7c7d9d9bb5796d0",
};

// otherwise we cannot hot load with react-native if we are using javascript sdk.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword("test@test.com", "test12345")
  //     .then((user) => {
  //       console.log(user), setIsAuthenticated(true);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
