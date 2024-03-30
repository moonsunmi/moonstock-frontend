import { StockContext } from "@/contexts/stockContext/StockContext";
import { initialStocks } from "@/contexts/stockContext/initialStocks";
import stockReducer from "@/contexts/stockContext/stockReducer";
import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import { useCallback, useReducer } from "react";
import { ActionType } from "types/actionTypes";
import { Purchase } from "types/stockTypes";
import { v4 as uuidv4 } from "uuid";
import Result from "./Result";
import PurchaseEntry from "./PurchaseEntry";

const AverageDownInPrice = () => {
  const [state, dispatch] = useReducer(stockReducer, initialStocks);

  const addStock = useCallback(() => {
    const newStock: Purchase = {
      id: uuidv4(),
      label: "추가 매수",
      price: "",
      quantity: "",
    };
    dispatch({ type: ActionType.ADD_ROW, payload: newStock });
  }, [dispatch]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="Calculate Average Down In Price"
    >
      <StockContext.Provider value={{ state, dispatch }}>
        {state.map((purchase: Purchase) => {
          return <PurchaseEntry key={purchase.id} purchase={purchase} />;
        })}
        <ButtonWrapper>
          <Button variant="outlined" onClick={addStock}>
            매수 추가
          </Button>
        </ButtonWrapper>
        <Result purchases={state} />
      </StockContext.Provider>
    </Paper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

export default AverageDownInPrice;
