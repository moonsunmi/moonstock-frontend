"use client";

import { useHoldingsContext } from "@/context/HoldingsContext";
import PurchaseDetailContainer from "./PurchaseDetailContainer";

const HoldingStock = () => {
  const { holdings, holdingsDispatch } = useHoldingsContext();

  return (
    <PurchaseDetailContainer
      label="보유 주식"
      purchase={holdings[0]} // Currently using first holding for now, but planning to update for handling multiple holdings
      dispatch={holdingsDispatch}
      isDeletable={false}
    />
  );
};

export default HoldingStock;
