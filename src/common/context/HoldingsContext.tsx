import { PurchaseAction } from "@/types/actionTypes";
import { IPurchase } from "@/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

interface IHoldingsContext {
  // TODO. Additios와 형태가 같음. 통합해야 할까?
  holdings: IPurchase[];
  holdingsDispatch: Dispatch<PurchaseAction>;
}

const HoldingsContext = createContext<IHoldingsContext | null>(null);

const useHoldingsContext = () => {
  const holdings = useContext(HoldingsContext);
  if (!holdings) {
    throw new Error("useHoldingsContext should be within HoldingsProvider");
  }
  return holdings;
};

export { HoldingsContext, useHoldingsContext };
