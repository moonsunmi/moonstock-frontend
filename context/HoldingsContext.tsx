import { PurchaseAction } from "@/types/actionTypes";
import { IPurchase } from "@/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

interface HoldingsContext {
  // TODO. Additios와 같음.
  holdings: IPurchase[];
  holdingsDispatch: Dispatch<PurchaseAction>;
}

const HoldingsContext = createContext<HoldingsContext | null>(null);

const useHoldingsContext = () => {
  const holdings = useContext(HoldingsContext);
  if (!holdings) {
    throw new Error("useHoldingsContext should be within HoldingsProvider");
  }
  return holdings;
};

export { HoldingsContext, useHoldingsContext };
