import React, { useContext, useEffect, useState, useCallback } from "react";
import * as firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { AuthenticationContext } from "@services/authentication/authentication.context";
import { SafeArea } from "@components/safe-area";
import { Navigation } from "@infrastructure/navigation";
import { Text } from "@components/text";
import { Spacer } from "@components/spacer";
import { StackNavigationProp } from "@react-navigation/stack";

import { StackNavigatorParams } from "@infrastructure/navigation/account.navigator";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

type SettingsProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Logout">;
};

export const SettingsScreen = ({ navigation }: SettingsProps) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState<string | null>(null);
  const getProfilePicture = async (currentUser: firebase.User) => {
    console.log("Currentuser", currentUser);
    const photoUri = await AsyncStorage.getItem(`${currentUser?.uid}-photo`);
    setPhoto(photoUri);
  };

  // it only triggers every time the screen is back into focus. Any time we go back and forth between screens, this will be triggered as well as when the user changes
  useFocusEffect(
    useCallback(() => {
      if (user) {
        getProfilePicture(user);
      }
    }, [user])
  );
  return (
    <SafeArea>
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <AvatarContainer>
          {!photo ? (
            // @ts-ignore
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          ) : (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              // @ts-ignore
              backgroundColor="#2182BD"
            />
          )}
          <Spacer position="top" size="large">
            <Text variant="label"> {user?.email} </Text>
          </Spacer>
        </AvatarContainer>
      </TouchableOpacity>

      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View Your Favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />

        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={() => navigation.navigate("Logout")}
        />
      </List.Section>
    </SafeArea>
  );
};
