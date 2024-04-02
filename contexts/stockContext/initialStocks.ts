import { Purchase, StockPurchaseInfo } from "types/stockTypes";

export const initialStockPurchaseInfo: StockPurchaseInfo = {
  holdingStocks: {
    id: "holdingStocks",
    price: "",
    quantity: "",
  },
  additionalPurchases: [
    {
      id: `addedStock1`, // TODO: ID: uuid로 해야 할지도.
      price: "",
      quantity: "",
    },
  ],
};
