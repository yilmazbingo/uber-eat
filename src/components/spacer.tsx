import React, { ReactElement } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

enum Size {
  small = 1,
  medium = 2,
  large = 3,
}

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

// this calculates the variants
const getVariant = (position: string, size: Size, theme: DefaultTheme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant}
`;

type SpacerProps = {
  position: string;
  size: Size;
  children: ReactElement;
};
export const Spacer = ({
  position,
  size,
  children,
}: SpacerProps): ReactElement => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

//this was cauisng bug in android. so we separated
// export const Spacer = styled.View`
//   ${({
//     position,
//     size,
//     theme,
//   }: {
//     position: string;
//     size: Size;
//     theme: DefaultTheme;
//   }) => getVariant(position, size, theme)}
// `;

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
