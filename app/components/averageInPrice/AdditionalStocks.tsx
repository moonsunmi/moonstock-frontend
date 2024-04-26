"use client";
import { Purchase, PurchaseType } from "@/app/types/stockTypes";
import PurchaseDetailContainer from "./PurchaseDetailContainer";
import { useAdditionsContext } from "@/app/context/additionals/AdditionsContext";

const AdditionalStocks = () => {
  const { state } = useAdditionsContext();

  return (
    <>
      {state.map((purchase: Purchase) => {
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
