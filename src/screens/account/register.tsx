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

type RegisterScreenProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Register">;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title> UberEats </Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>

        {error && error.message ? (
          <ErrorContainer>
            <Text variant="error">{error.message}</Text>
          </ErrorContainer>
        ) : (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}

        <Spacer size="large">
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color={Colors.blue300}
            ></ActivityIndicator>
          ) : (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          )}
        </Spacer>
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
