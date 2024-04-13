import { useStockContext } from "@/contexts/stockContext/StockContext";
import { createInitialPurchase } from "@/contexts/stockContext/initialPurchases";
import { Grid } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { ActionType } from "types/actionTypes";
import { apiStatus } from "types/apiStatus";
import { Purchase, Stock, StockInfo } from "types/stockTypes";
import SearchBox from "./SearchBox";
import StatusDescription from "./StatusDescription";
import StyledButton from "./StyledButton";

const AddPurchase = ({ stockList }: { stockList: Stock[] }) => {
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
      const response = await fetch(
        `/api/getStockInfo?stockName=${encodeURIComponent(stockName)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        setStatus(apiStatus.error);
        return;
      }

      const data: StockInfo = await response.json();
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
        setStatus(apiStatus.success);
      } else {
        setStatus(apiStatus.noResult);
      }
    } catch (error) {
      console.error("네트워크 요청 중 에러가 발생했습니다.", error);
      setStatus(apiStatus.error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);
  };

  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      <Grid item xs={12} sm={6}>
        <SearchBox
          value={stockName}
          onChange={onChange}
          stockList={stockList}
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
