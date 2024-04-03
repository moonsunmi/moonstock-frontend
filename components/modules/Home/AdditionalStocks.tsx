import { useStockContext } from "@/contexts/stockContext/StockContext";
import { Button } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";
import { ActionType } from "types/actionTypes";
import { Purchase, PurchaseType } from "types/stockTypes";
import { v4 as uuidv4 } from "uuid";
import PurchaseInfo from "./PurchaseInfo";

const AdditionalStocks = () => {
  const {
    state: { additions },
    dispatch,
  } = useStockContext();

  const addStock = useCallback(() => {
    const newStock: Purchase = {
      id: uuidv4(),
      price: "",
      quantity: "",
    };
    dispatch({ type: ActionType.ADD_ADDITIONAL, payload: newStock });
  }, [dispatch]);

  return (
    <>
      {additions.map((purchase: Purchase) => {
        return (
          <PurchaseInfo
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            purchaseType={PurchaseType.ADDITIONS}
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

export default AdditionalStocks;
