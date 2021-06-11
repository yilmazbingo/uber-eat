import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StackNavigationProp } from "@react-navigation/stack";
import { MapSearch } from "../components/map/map-search";
import styled from "styled-components/native";
import { RestaurantsContext } from "@services/restaurant/restaurant.context";
import { LocationContext } from "@services/location/location.context";
import { MapCallout } from "../components/map/map-callout";
import { StackNavigatorParams } from "@infrastructure/navigation/app.navigator";
import { StackNavigatorParams as RestaurantStackNavigatorParams } from "@infrastructure/navigation/restaurants.navigator";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

type RestaurantMapProps = {
  navigation: StackNavigationProp<
    RestaurantStackNavigatorParams,
    "RestaurantDetail"
  >;
};

export const RestaurantMap = ({ navigation }: RestaurantMapProps) => {
  const { location } = useContext(LocationContext);
  // console.log("locationnn", location);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location!;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta);
  }, [location, viewport]);
  return (
    <>
      <MapSearch />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant: any) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              pinColor="black"
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant })
                }
              >
                <MapCallout restaurant={restaurant}></MapCallout>
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

type MapScreenProps = {
  // navigation: StackNavigationProp<StackNavigatorParams, "Map">;
  navigation: StackNavigationProp<
    RestaurantStackNavigatorParams,
    "RestaurantDetail"
  >;
};

export const MapScreen = ({ navigation }: MapScreenProps) => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0.02,
        }}
      ></Map>
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
