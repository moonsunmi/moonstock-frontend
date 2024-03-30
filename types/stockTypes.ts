import { NumberInput } from "./formTypes";

export type StockInfo = {
  id: string;
  label: string;
  price: NumberInput;
  quantity: NumberInput;
};
