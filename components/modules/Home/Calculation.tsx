import { StockContext } from "@/contexts/stockContext/StockContext";
import { initialStocks } from "@/contexts/stockContext/initialStocks";
import {
  ActionType,
  StockInfoType,
  stockReducer,
} from "@/contexts/stockContext/stockReducer";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useReducer } from "react";
import StockInfoBoard from "./StockInfoBoard";

const Calculation = () => {
  const [state, dispatch] = useReducer(stockReducer, initialStocks);

  const addStock = () => {
    const newStock: StockInfoType = {
      id: `addedStock${Date.now()}`,
      title: "추가 매수",
      price: "",
      quantity: "",
      total: "",
    };
    dispatch({ type: ActionType.ADD_ROW, payload: newStock });
  };

  return (
    <>
      <StockContext.Provider value={{ state, dispatch }}>
        {state.map((item: StockInfoType) => {
          return (
            <Wrapper key={item.id}>
              <StockInfoBoard key={item.id} stockInfo={item} />
            </Wrapper>
          );
        })}
        <Button variant="outlined" onClick={addStock}>
          매수 추가
        </Button>
      </StockContext.Provider>
    </>
  );
};

const Wrapper = styled.div`
  align-items: center;
`;

export default Calculation;
