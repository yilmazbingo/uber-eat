import React from "react";
import { View, Text } from "react-native";

import {
  AccountBackground,
  AccountCover,
} from "@components/account/account.styles";

export const AccountScreen = () => {
  return (
    <AccountBackground>
      <AccountCover></AccountCover>
    </AccountBackground>
  );
};
