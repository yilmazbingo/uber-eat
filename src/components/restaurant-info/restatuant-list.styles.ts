import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "@infrastructure/theme/colors";
import { IRestaurant } from "../../types/interfaces";

// This is because styled.FlatList does not support by typing definition of styled-components.
export const RestaurantList = styled(
  FlatList as new () => FlatList<IRestaurant>
).attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;
