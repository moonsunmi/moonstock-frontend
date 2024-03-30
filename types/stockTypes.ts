import { FieldNumberValue } from "./formTypes";

export type StockInfo = {
  id: string;
  label: string;
  price: FieldNumberValue;
  quantity: FieldNumberValue;
};
