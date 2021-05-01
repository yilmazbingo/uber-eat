import React, { ReactElement } from "react";
import styled from "styled-components/native";
import { Text } from "../text";
import WebView from "react-native-webview";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

//  we want thsi to be called only for map
const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

type CompactRestaurantInfoProps = {
  restaurant: any;
  isMap: boolean;
};

export const CompactRestaurantInfo = ({
  restaurant,
  isMap,
}: CompactRestaurantInfoProps): ReactElement => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {" "}
        {restaurant.name}{" "}
      </Text>
    </Item>
  );
};
