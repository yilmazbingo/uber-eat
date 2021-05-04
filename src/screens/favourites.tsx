import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FavouritesContext } from "@services/favourites/favourites.context";
import { SafeArea } from "@components/safe-area";
import { Text } from "@components/text";
import { RestaurantList } from "@components/restaurant-info/restatuant-list.styles";
import { RestaurantInfo } from "@components/restaurant-info/restaurantInfo";
import { Spacer } from "@components/spacer";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
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
        keyExtractor={(item: { name: number }) => String(item.name)}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center> You have not chosen any favourite yet </Text>
    </NoFavouritesArea>
  );
};
