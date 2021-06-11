import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FavouritesContext } from "@services/favourites/favourites.context";
import { SafeArea } from "@components/safe-area";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@components/text";
import { RestaurantList } from "@components/restaurant-info/restatuant-list.styles";
import { RestaurantInfo } from "@components/restaurant-info/restaurantInfo";
import { Spacer } from "@components/spacer";
import { StackNavigatorParams } from "@infrastructure/navigation/restaurants.navigator";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

type FavouritesScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "RestaurantDetail">;
};
export const FavouritesScreen = ({ navigation }: FavouritesScreenProps) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", { restaurant: item })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfo restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text> You have not chosen any favourite yet </Text>
    </NoFavouritesArea>
  );
};
