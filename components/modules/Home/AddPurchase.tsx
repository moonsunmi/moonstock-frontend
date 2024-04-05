import { useStockContext } from "@/contexts/stockContext/StockContext";
import { createInitialPurchase } from "@/contexts/stockContext/initialStocks";
import { Box, Button, TextField } from "@mui/material";
import instance from "api/apiClient";
import { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { ActionType } from "types/actionTypes";
import { apiStatus } from "types/apiStatus";
import { Purchase, StockInfoType } from "types/stockTypes";
import StatusDescription from "./StatusDescription";

const getStockInfo = async (stockName: string) => {
  try {
    const response = await instance.get("", { params: { itmsNm: stockName } });
    return response.data.response.body;
  } catch (error) {
    throw new Error("서버 응답 에러");
  }
};

const AddPurchase = () => {
  const [stockName, setStockName] = useState<string>("");
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle);

  const { dispatch } = useStockContext();

  const addPurchase = useCallback(() => {
    const newPurchase: Purchase = createInitialPurchase();
    dispatch({ type: ActionType.ADD_ADDITIONAL, payload: newPurchase });
    setStockName("");
  }, [dispatch]);

  const handleClick = async () => {
    setStatus(apiStatus.loading);
    try {
      const data: StockInfoType = await getStockInfo(stockName);
      if (data && data.totalCount > 0) {
        const newPrice = data.items?.item[0]?.clpr;
        if (newPrice) {
          const newPurchase: Purchase = createInitialPurchase({
            price: Number(newPrice.replace(",", "")),
          });
          dispatch({
            type: ActionType.ADD_ADDITIONAL,
            payload: newPurchase,
          });
        }
        setStockName("");
        setStatus(apiStatus.idle);
      } else {
        setStatus(apiStatus.noResult);
      }
    } catch {
      setStatus(apiStatus.error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
  };

  return (
    <ButtonWrapper>
      <Box>
        <LiveStkPrcWrapper>
          <TextField
            size="small"
            label="종목 이름"
            value={stockName}
            placeholder="ex) 삼성전자"
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            onClick={handleClick}
            disabled={!stockName.trim()}
          >
            가격 입력
          </Button>
        </LiveStkPrcWrapper>
        <div>
          <StatusDescription status={status} />
        </div>
      </Box>
      <Button variant="outlined" onClick={addPurchase}>
        빈칸 추가
      </Button>
    </ButtonWrapper>
  );
};
const LiveStkPrcWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
export default AddPurchase;
