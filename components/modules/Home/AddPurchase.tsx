import { useStockContext } from "@/contexts/stockContext/StockContext";
import { createInitialPurchase } from "@/contexts/stockContext/initialStocks";
import { Box, Button, Grid, TextField } from "@mui/material";
import instance from "api/apiClient";
import { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { ActionType } from "types/actionTypes";
import { apiStatus } from "types/apiStatus";
import { Purchase, StockInfoType } from "types/stockTypes";
import StatusDescription from "./StatusDescription";
import StyledButton from "./StyledButton";

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
    setStockName("");
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
    <Grid container spacing={1} width="100vw" sx={{ padding: 1 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          size="small"
          label="종목 이름"
          value={stockName}
          placeholder="ex) 삼성전자"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StyledButton onClick={handleClick} disabled={!stockName.trim()}>
          가격 입력
        </StyledButton>
      </Grid>
      <Grid item xs={6} sm={3}>
        <StyledButton onClick={addPurchase}>빈칸 추가</StyledButton>
      </Grid>
      <Grid item xs={12} sm={9}>
        <StatusDescription status={status} />
      </Grid>
    </Grid>
  );
};

export default AddPurchase;
