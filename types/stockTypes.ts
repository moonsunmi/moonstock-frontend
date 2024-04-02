import { FieldNumberValue } from "./formTypes";

export type Purchase = {
  id: string;
  price: FieldNumberValue;
  quantity: FieldNumberValue;
};

export enum PurchaseType {
  HOLDING_STOCKS = "holdingStocks",
  ADDITIONAL_PURCHASES = "additionalPurchases",
}

export type StockPurchaseInfo = {
  [PurchaseType.HOLDING_STOCKS]: Purchase;
  [PurchaseType.ADDITIONAL_PURCHASES]: Purchase[];
};
