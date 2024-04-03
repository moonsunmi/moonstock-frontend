import { StockPurchaseInfo } from "types/stockTypes";

export const initialStock = {}; // todo.

export const initialPurchases: StockPurchaseInfo = {
  holding: {
    id: "holding",
    price: "",
    quantity: "",
  },
  additions: [
    {
      id: `addedStock1`, // TODO: ID: uuid로 해야 할지도.
      price: "",
      quantity: "",
    },
  ],
};
