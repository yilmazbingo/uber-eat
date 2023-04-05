import React, { useContext, useState } from "react";
import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { RestaurantInfo } from "@components/restaurant-info/restaurantInfo";
import { FadeInView } from "@components/animations/fade.animation";
import { Spacer } from "@components/spacer";
import { Text } from "@components/text";
import { Search } from "@components/search";
import { RestaurantList } from "@components/restaurant-info/restatuant-list.styles";
import { RestaurantsContext } from "@services/restaurant/restaurant.context";
import { LocationContext } from "@services/location/location.context";
import { FavouritesContext } from "@services/favourites/favourites.context";
import { FavouritesBar } from "@components/favorites/favourites-bar";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StackNavigatorParams } from "@infrastructure/navigation/restaurants.navigator";

//Statusbar.currentHeight is supported only in android. so in ios i get error
// JSON value 'px' of type NSstring cannot be converted of a ABI40.
const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top:${StatusBar.currentHeight}px`};
  background-color: blue;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

type RestaurantScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Restaurants">;
};
export const RestaurantsScreen = ({ navigation }: RestaurantScreenProps) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);

  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;
  // const { favourites } = useContext(FavouritesContextProvider);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          {/* <Loading size={50} animating={true} color={Colors.blue300} /> */}
          <Loading size={50} animating={true} color="blue" />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      ></Search>
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong</Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: item,
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfo restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          // keyExtractor={(item: { name: number }) => String(item.name)}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeArea>
  );
};
