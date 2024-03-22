import { Dispatch, createContext, useContext } from "react";
import { StockAction, StockInfoType } from "./stockReducer";

interface StockContextType {
  state: StockInfoType[];
  dispatch: Dispatch<StockAction>;
}

const StockContext = createContext<StockContextType | null>(null);

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
