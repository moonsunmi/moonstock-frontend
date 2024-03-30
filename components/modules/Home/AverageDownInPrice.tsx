import { StockContext } from "@/contexts/stockContext/StockContext";
import { initialStocks } from "@/contexts/stockContext/initialStocks";
import stockReducer from "@/contexts/stockContext/stockReducer";
import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import { useReducer } from "react";
import { ActionType } from "types/actionTypes";
import { StockInfo } from "types/stockTypes";
import { v4 as uuidv4 } from "uuid";
import Result from "./Result";
import StockInput from "./StockInput";

const AverageDownInPrice = () => {
  const [state, dispatch] = useReducer(stockReducer, initialStocks);

  const addStock = () => {
    const newStock: StockInfo = {
      id: uuidv4(),
      label: "추가 매수",
      price: "",
      quantity: "",
    };
    dispatch({ type: ActionType.ADD_ROW, payload: newStock });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="Calculate Average Down In Price"
    >
      <StockContext.Provider value={{ state, dispatch }}>
        {state.map((item: StockInfo) => {
          return <StockInput key={item.id} stockInfo={item} />;
        })}
        <ButtonWrapper>
          <Button variant="outlined" onClick={addStock}>
            매수 추가
          </Button>
        </ButtonWrapper>
        <Result stocks={state} />
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
