"use client";
import { StockContext } from "@/app/context/stock/StockContext";
import { initialPurchases } from "@/app/context/stock/initialPurchases";
import stockReducer from "@/app/context/stock/stockReducer";
import { Stock } from "@/app/types/stockTypes";
import { useReducer } from "react";
import AddPurchase from "./AddPurchase";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import Result from "./Result";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  const [state, dispatch] = useReducer(stockReducer, initialPurchases);

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      <HoldingStock />
      <AdditionalStocks />
      <AddPurchase stockList={stockList} />
      <Result />
    </StockContext.Provider>
  );
};

export default AverageDown;
