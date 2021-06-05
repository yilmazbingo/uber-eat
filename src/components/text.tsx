import styled, { DefaultTheme } from "styled-components/native";

//  if text has no variant, this is the default
const defaultTextStyles = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

// interface Variants {
//   body: string;
//   label: string;
//   caption: string;
//   error: string;
//   hint: string;
// }

// enum Variants {
//   body = "body",
//   label = "label",
//   caption = "caption",
//   error = "error",
//   hint = "hint",
// }

type Variants = "body" | "label" | "caption" | "error" | "hint";

interface TextProps {
  theme?: DefaultTheme;
  // variant?: Omit<keyof Variants, undefined>;
  variant?: Variants;
}

export const Text = styled.Text<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant ?? "body"](theme)}
`;

Text.defaultProps = {
  variant: "body",
} as Pick<TextProps, "variant">;
