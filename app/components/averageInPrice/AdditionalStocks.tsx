"use client";
import { useAdditionsContext } from "@/app/context/additionals/AdditionsContext";
import { Purchase } from "@/app/types/stockTypes";
import PurchaseDetailContainer from "./PurchaseDetailContainer";

const AdditionalStocks = () => {
  const { additions } = useAdditionsContext();

  return (
    <>
      {additions.map((purchase: Purchase) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
          />
        );
      })}
    </>
  );
};

export default AdditionalStocks;
