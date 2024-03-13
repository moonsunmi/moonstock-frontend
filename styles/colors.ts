export enum PrimaryColors {
  base = "#58E084",
  var100 = "#E0FDDE",
  var200 = "#BEFBC0",
  var300 = "#9CF5A7",
  var400 = "#80EC98",
  var500 = "#58E084",
  var600 = "#40C076",
  var700 = "#2CA169",
  var800 = "#1C815B",
  var900 = "#106B51",
}

export enum SecondaryColors {
  base = "#9E43F2",
  var100 = "#F4D9FE",
  var200 = "#E5B4FD",
  var300 = "#D28EFB",
  var400 = "#BD71F7",
  var500 = "#9E43F2",
  var600 = "#7B30D0",
  var700 = "#5C21AE",
  var800 = "#40158C",
  var900 = "#2D0C74",
}

export enum GrayColors {
  white = "#FFFFFF",
  gray25 = "#FCFCFD",
  gray50 = "#F9FAFB",
  gray100 = "#F2F4F7",
  gray200 = "#E4E7EC",
  gray300 = "#D0D5DD",
  gray400 = "#98A2B3",
  gray500 = "#667085",
  gray600 = "#475467",
  gray700 = "#344054",
  gray800 = "#1D2939",
  gray900 = "#101828",
  black = "#000000",
}

export enum ThemeColors {
  Theme = "#0046CF",
  Kakao = "#FFD621",
  KakaoBrown = "#3c1e1e",
  LightRed = "#FFE2DB",
}

export enum InputColors {
  typing = "#58E084",
  warning = "#FF5A63",
  verified = "#65BF73",
}

export type ColorTypes =
  | PrimaryColors
  | SecondaryColors
  | ThemeColors
  | GrayColors
  | InputColors;
