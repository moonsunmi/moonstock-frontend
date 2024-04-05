import { useStockContext } from "@/contexts/stockContext/StockContext";
import { createInitialPurchase } from "@/contexts/stockContext/initialStocks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import instance from "api/apiClient";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ActionType } from "types/actionTypes";
import { Purchase, StockInfoType } from "types/stockTypes";

const getStockInfo = async (stockName: string) => {
  try {
    const response = await instance.get("", { params: { itmsNm: stockName } });
    return response.data.response.body;
  } catch (error) {
    console.log("주식 정보를 가져오는 데 실패했습니다.", error);
  }
};

const AddPurchase = () => {
  const [stockName, setStockName] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<StockInfoType | null>(null);
  const [isError, setIsError] = useState(false);

  const { dispatch } = useStockContext();

  const addPurchase = useCallback(() => {
    const newPurchase: Purchase = createInitialPurchase();
    dispatch({ type: ActionType.ADD_ADDITIONAL, payload: newPurchase });
  }, [dispatch]);

  const handleClick = async () => {
    const data = await getStockInfo(stockName);
    console.log(data);
    setStockInfo(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
  };

  useEffect(
    function updatePrice() {
      if (stockInfo?.totalCount === 0) {
        setIsError(true);
      } else {
        setIsError(false);
        const newPrice = stockInfo?.items?.item[0]?.clpr;
        if (newPrice) {
          const newPurchase: Purchase = createInitialPurchase({
            price: Number(newPrice.replace(",", "")),
          });
          dispatch({
            type: ActionType.ADD_ADDITIONAL,
            payload: newPurchase,
          });
        }
      }
    },
    [stockInfo, dispatch]
  );

  return (
    <ButtonWrapper>
      <Box>
        <div>
          <TextField
            size="small"
            label="종목 이름"
            placeholder="ex) 삼성전자"
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleClick}>
            종목 가격으로 매수 추가
          </Button>
        </div>
        <div>
          {isError ? (
            <Typography variant="caption" color={red[300]}>
              종목 이름을 다시 확인해 주세요
            </Typography>
          ) : (
            <Typography variant="caption" color={blue[300]}>
              현재 가격(전날 기준)이 자동으로 입력됩니다.
            </Typography>
          )}
        </div>
      </Box>
      <Button variant="outlined" onClick={addPurchase}>
        매수 빈칸 추가
      </Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
export default AddPurchase;
