"use client";

import { useHoldingsContext } from "@/app/context/holdings/HoldingsContext";
import PurchaseDetailContainer from "./PurchaseDetailContainer";

const HoldingStock = () => {
  const { holdings } = useHoldingsContext();

  return (
    <PurchaseDetailContainer
      label="보유 주식"
      purchase={holdings[0]} // Currently using first holding for now, but planning to update for handling multiple holdings
      isDeletable={false}
    />
  );
};

export default HoldingStock;
