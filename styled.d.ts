import { ILineHeights, Space } from "./src/infrastructure/theme/spacing";
import "styled-components";
import { IColors } from "./src/infrastructure/theme/colors";
import {
  IFontSizes,
  IFontWeights,
  IFonts,
} from "./src/infrastructure/theme/fonts";
import { Sizes } from "./src/infrastructure/theme/sizes";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: IColors;
    fontSizes: IFontSizes;
    fontWeights: IFontWeights;
    lineHeights: ILineHeights;
    space: Space;
    sizes: Sizes;
    fonts: IFonts;
  }
}
