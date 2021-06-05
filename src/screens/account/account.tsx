import React from "react";
import LottieView from "lottie-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Spacer } from "@components/spacer";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  AnimationWrapper,
} from "@components/account/account.styles";
import { StackNavigatorParams } from "@infrastructure/navigation/account.navigator";

type AccountScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams>;
};

export const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title> UberEats </Title>
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/delivery.json")}
        />
      </AnimationWrapper>

      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
