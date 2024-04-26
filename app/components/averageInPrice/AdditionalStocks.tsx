"use client";
import { useStockContext } from "@/app/context/stock/StockContext";
import { Purchase, PurchaseType } from "@/app/types/stockTypes";
import PurchaseDetailContainer from "./PurchaseDetailContainer";

const AdditionalStocks = () => {
  const {
    state: { additions },
  } = useStockContext();

  return (
    <>
      {additions.map((purchase: Purchase) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            purchaseType={PurchaseType.ADDITIONS}
          />
        );
      })}
    </>
  );
};

export default AdditionalStocks;
