import { StockContext } from "@/contexts/stockContext/StockContext";
import {
  ActionType,
  StockInfoType,
  stockReducer,
} from "@/contexts/stockContext/stockReducer";
import { useReducer } from "react";
import StockInfoBoard from "./StockInfoBoard";
import { Button } from "@mui/material";
import { initialStocks } from "@/contexts/stockContext/initialStocks";

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
          return <StockInfoBoard key={item.id} stockInfo={item} />;
        })}
        <Button variant="outlined" onClick={addStock}>
          매수 추가
        </Button>
      </StockContext.Provider>
    </>
  );
};

export default Calculation;
