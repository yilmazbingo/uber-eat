import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { MapSearch } from "../components/map/map-search";
import styled from "styled-components/native";
import { RestaurantsContext } from "@services/restaurant/restaurant.context";
import { LocationContext } from "@services/location/location.context";
import { MapCallout } from "../components/map/map-callout";
const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta, viewport);
  }, [location]);
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

// coordinate={{longitude:,latitude:}}
