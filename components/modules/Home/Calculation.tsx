import { StockContext } from "@/contexts/stockContext/StockContext";
import {
  StockInfoType,
  stockReducer,
} from "@/contexts/stockContext/stockReducer";
import { useReducer } from "react";
import StockInfoBoard from "./StockInfoBoard";

const initialState: StockInfoType[] = [
  {
    id: "heldStock",
    title: "보유 주식",
    price: "",
    quantity: "",
    total: "",
  },
  {
    id: "addedStock1",
    title: "추가 매수1",
    price: "",
    quantity: "",
    total: "",
  },
];

const Calculation = () => {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  return (
    <>
      <StockContext.Provider value={{ state, dispatch }}>
        {state.map((item: StockInfoType) => {
          return <StockInfoBoard key={item.id} stockInfo={item} />;
        })}
      </StockContext.Provider>
    </>
  );
};

export default Calculation;
