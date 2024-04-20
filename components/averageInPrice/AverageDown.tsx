"use client";
import { StockContext } from "@/contexts/stockContext/StockContext";
import { initialPurchases } from "@/contexts/stockContext/initialPurchases";
import stockReducer from "@/contexts/stockContext/stockReducer";
import { useReducer } from "react";
import { Stock } from "types/stockTypes";
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
