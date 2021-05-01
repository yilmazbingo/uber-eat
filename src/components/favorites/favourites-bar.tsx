import React, { ReactElement } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { CompactRestaurantInfo } from "@components/restaurant-info/compact-restaurant-info";
import { Spacer } from "@components/spacer";
import { Text } from "@components/text";
const FavouritesWrapper = styled.View`
  padding: 10px;
`;

type FavouritesBarProps = {
  favourites: any[];
  onNavigate(): void;
};
export const FavouritesBar = ({
  favourites,
  onNavigate,
}: FavouritesBarProps): ReactElement => {
  if (!favourites.length) {
    return <></>;
  }
  return (
    <FavouritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption"> Favourites </Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name.split(" ").join("");
          return (
            <Spacer position="left" size="medium" key={key}>
              <TouchableOpacity
                onPress={() => onNavigate("RestaurantDetail", { restaurant })}
              >
                <CompactRestaurantInfo
                  restaurant={restaurant}
                ></CompactRestaurantInfo>
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
