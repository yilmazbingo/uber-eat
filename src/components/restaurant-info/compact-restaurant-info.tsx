import React, { ReactElement } from "react";
import styled from "styled-components/native";
import { Text } from "../text";
// this renders a page instead of image. works only for android
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
// this does not work in android so we use WebView
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

//  we want thsi to be called only for map.
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
  isMap?: boolean;
};

export const CompactRestaurantInfo = ({
  restaurant,
  isMap,
}: CompactRestaurantInfoProps): ReactElement => {
  //------------ this is causing typescript error---------
  // const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  return (
    <Item>
      {isAndroid && isMap ? (
        <WebView source={{ uri: restaurant.photos[0] }} />
      ) : (
        <CompactImage source={{ uri: restaurant.photos[0] }} />
      )}
      <WebView source={{ uri: restaurant.photos[0] }} />

      <Text variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};
