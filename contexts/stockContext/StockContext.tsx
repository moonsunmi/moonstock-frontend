import { Dispatch, createContext, useContext } from "react";
import { PurchaseAction } from "types/actionTypes";
import { Purchase } from "types/stockTypes";

interface StockContext {
  state: Purchase[];
  dispatch: Dispatch<PurchaseAction>;
}

const StockContext = createContext<StockContext | null>(null);

const useStockContext = () => {
  const value = useContext(StockContext);
  if (value === null) {
    throw new Error(
      "useStockContext should be used within StockContext.Provider"
    );
  }
  return value;
};

export { StockContext, useStockContext };
