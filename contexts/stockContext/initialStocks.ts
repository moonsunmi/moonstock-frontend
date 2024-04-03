import { Purchase, StockPurchaseInfo } from "types/stockTypes";
import { v4 as uuidv4 } from "uuid";

export const createInitialPurchase = (): Purchase => ({
  id: uuidv4(),
  price: "",
  quantity: "",
});

export const initialPurchases: StockPurchaseInfo = {
  holding: {
    id: "holding",
    price: "",
    quantity: "",
  },
  additions: [createInitialPurchase()],
};
