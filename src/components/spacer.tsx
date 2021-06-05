import React, { ReactElement } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

interface SizeVariant {
  small: 1;
  medium: 2;
  large: 3;
  xl: 4;
  xxl: 5;
}

interface PositionVariant {
  top: "marginTop";
  left: "marginLeft";
  right: "marginRight";
  bottom: "marginBottom";
}

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant: PositionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

// this calculates the variants
const getVariant = (
  position: keyof PositionVariant,
  size: keyof SizeVariant,
  theme: DefaultTheme
) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

interface SpacerViewProps {
  variant: ReturnType<typeof getVariant>;
}
const SpacerView = styled.View<SpacerViewProps>`
  ${({ variant }) => variant}
`;

type SpacerProps = {
  position: keyof PositionVariant;
  size: keyof SizeVariant;
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

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
