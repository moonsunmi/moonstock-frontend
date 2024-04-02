import { useStockContext } from "@/contexts/stockContext/StockContext";
import { Button } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";
import { ActionType } from "types/actionTypes";
import { Purchase, PurchaseType } from "types/stockTypes";
import { v4 as uuidv4 } from "uuid";
import TotalAmountField from "./TotalAmountField";

const PurchaseEntry = () => {
  const {
    state: { additionalPurchases },
    dispatch,
  } = useStockContext();

  const addStock = useCallback(() => {
    const newStock: Purchase = {
      id: uuidv4(),
      price: "",
      quantity: "",
    };
    dispatch({ type: ActionType.ADD_PURCHASE, payload: newStock });
  }, [dispatch]);

  return (
    <>
      {additionalPurchases.map((purchase: Purchase) => {
        return (
          <TotalAmountField
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            purchaseType={PurchaseType.ADDITIONAL_PURCHASES}
          />
        );
      })}
      <ButtonWrapper>
        <Button variant="outlined" onClick={addStock}>
          매수 추가
        </Button>
      </ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

export default PurchaseEntry;
