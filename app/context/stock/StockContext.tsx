"use client";
import { PurchaseAction } from "@/app/types/actionTypes";
import { StockPurchaseDetail } from "@/app/types/stockTypes";
import { Dispatch, createContext, useContext } from "react";

interface StockContext {
  state: StockPurchaseDetail;
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
