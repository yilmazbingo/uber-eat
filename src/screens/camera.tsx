import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components/text";
import { AuthenticationContext } from "@services/authentication/authentication.context";
import { StackNavigatorParams } from "@infrastructure/navigation/settings.navigator";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

type CameraScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

export const CameraScreen = ({ navigation }: CameraScreenProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        AsyncStorage.setItem(`${user?.uid}-photo`, photo.uri);
        navigation.goBack();
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={(camera) =>
          cameraRef.current ? (cameraRef.current = camera) : null
        }
        type={Camera.Constants.Type.front}
      />
    </TouchableOpacity>
  );
};
