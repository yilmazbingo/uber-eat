import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@infrastructure/navigation/account.navigator";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from "@components/account/account.styles";
import { Spacer } from "@components/spacer";
import { AuthenticationContext } from "@services/authentication/authentication.context";
import { Text } from "@components/text";

type LoginScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Login">;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title variant="label"> UberEats </Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />

        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
        />

        <Spacer />
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error.message}</Text>
          </ErrorContainer>
        )}
        {isLoading ? (
          <ActivityIndicator color={Colors.blue300} animating={true} />
        ) : (
          <Spacer size="large">
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          </Spacer>
        )}
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          {" "}
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
