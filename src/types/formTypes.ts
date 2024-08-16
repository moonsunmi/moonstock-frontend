import { blue, grey, red } from "@mui/material/colors";

type InputField = "price" | "quantity";

export type Inputs = {
  [key in InputField]: string;
};

export type Output = {
  investmentAmount: string;
};

export type FieldValue = "" | number;

export const valueChangeIndicator = {
  even: { symbol: "-", color: grey[600] },
  decrease: { symbol: "↓", color: blue[800] },
  increase: { symbol: "↑", color: red[800] },
};
