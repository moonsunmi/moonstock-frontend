import { FieldValue } from "./formTypes";

export type Purchase = {
  id: string;
  price: FieldValue;
  quantity: FieldValue;
};

export enum PurchaseType {
  HOLDING = "holding",
  ADDITIONS = "additions",
}

export type StockPurchaseInfo = {
  [PurchaseType.HOLDING]: Purchase;
  [PurchaseType.ADDITIONS]: Purchase[];
};
