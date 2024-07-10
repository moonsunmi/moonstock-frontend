"use client";

import { useHoldingsContext } from "@/common/context/HoldingsContext";
import PurchaseDetail from "./PurchaseDetail";

const HoldingStocks = () => {
  const { holdings, holdingsDispatch } = useHoldingsContext();

  return (
    <PurchaseDetail
      label="보유 주식"
      purchase={holdings[0]} // Currently using first holding for now, but planning to update for handling multiple holdings
      dispatch={holdingsDispatch}
      isDeletable={false}
    />
  );
};

export default HoldingStocks;
