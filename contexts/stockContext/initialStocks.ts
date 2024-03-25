import { StockInfoType } from "./stockReducer";

export const initialStocks: StockInfoType[] = [
  {
    id: "heldStock",
    title: "보유 주식",
    price: "",
    quantity: "",
    total: "",
  },
  {
    id: `addedStock${Date.now()}`,
    title: "추가 매수",
    price: "",
    quantity: "",
    total: "",
  },
];
