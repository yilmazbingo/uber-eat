export const lineHeights = {
  title: "28px",
  copy: "20px",
} as const;

export const space = ["0px", "4px", "8px", "16px", "32px", "64px"] as const;

export interface ILineHeights {
  title: "28px";
  copy: "20px";
}

export type Space = ["0px", "4px", "8px", "16px", "32px", "64px"];
