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
import StockInfo from "./StockInfo";
import { red } from "@mui/material/colors";

const Calculation = () => {
  const [state, dispatch] = useReducer(stockReducer, initialStocks);

  const addStock = () => {
    const newStock: StockInfoType = {
      id: `addedStock${Date.now()}`,
      title: "추가 매수",
      price: "",
      quantity: "",
    };
    dispatch({ type: ActionType.ADD_ROW, payload: newStock });
  };

  // function calculateWholeStocks() {
  //   let quantity = 0;
  //   let investment = 0;
  //   state.map((item) => {
  //     quantity += item.price === "" ? 0 : Number(item.quantity);
  //     investment += Number(item.price) * Number(item.quantity);
  //   });
  //   let price: number | "" = quantity === 0 ? "" : investment / quantity;
  //   return { price, quantity, investment };
  // }

  // const total = calculateWholeStocks();

  return (
    <>
      <StockContext.Provider value={{ state, dispatch }}>
        {state.map((item: StockInfoType) => {
          return (
            <Wrapper key={item.id}>
              <StockInfo key={item.id} stockInfo={item} />
            </Wrapper>
          );
        })}
        <Wrapper>
          {/* <StockInfo
            stockInfo={{ id: "result", title: `물타기 결과`, ...total }}
            bgColor={red[100]}
          /> */}
        </Wrapper>
        <ButtonWrapper>
          <Button variant="outlined" onClick={addStock}>
            매수 추가
          </Button>
          <Button variant="contained">물타기 계산</Button>
        </ButtonWrapper>
      </StockContext.Provider>
    </>
  );
};

const Wrapper = styled.div`
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  align-items: right;
  padding: 5px;
`;

export default Calculation;
