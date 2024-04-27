"use client";

import { useAdditionsContext } from "@/context/AdditionsContext";
import { Purchase } from "@/types/stockTypes";
import PurchaseDetailContainer from "./PurchaseDetail";

const AdditionStocks = () => {
  const { additions, additionsDispatch } = useAdditionsContext();

  return (
    <>
      {additions.map((purchase: Purchase) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            dispatch={additionsDispatch}
          />
        );
      })}
    </>
  );
};

export default AdditionStocks;
