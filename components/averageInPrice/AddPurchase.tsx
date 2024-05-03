"use client";

import { useAdditionsContext } from "@/context/AdditionsContext";
import { createInitialPurchase } from "@/context/initialPurchases";
import useInput from "@/hooks/useInput";
import { useResponsiveHeight } from "@/hooks/useResponsiveHeight";
import { ActionType } from "@/types/actionTypes";
import { apiStatus } from "@/types/apiStatus";
import { APIStockDetail, IPurchase } from "@/types/stockTypes";
import { Grid, Skeleton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useCallback, useState } from "react";
import SearchStockInput from "../UI/SearchStockInput";
import StyledButton from "../UI/StyledButton";
import StatusDescription from "./StatusDescription";

const AddPurchase = () => {
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle);
  const [input, setInput, onChange] = useInput("");

  const { additionsDispatch } = useAdditionsContext();

  const addPurchase = useCallback(() => {
    const newPurchase: IPurchase = createInitialPurchase();
    additionsDispatch({ type: ActionType.ADD, payload: newPurchase });
    setInput("");
  }, [additionsDispatch, setInput]);

  const handleClick = async () => {
    setStatus(apiStatus.loading);
    setInput("");

    try {
      const response = await fetch(
        `/api/stock-info?stock-name=${encodeURIComponent(input)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        setStatus(apiStatus.error);
        return;
      }

      const data: APIStockDetail = await response.json();
      if (data && data.totalCount > 0) {
        const newPrice = data.items?.item[0]?.clpr;
        if (newPrice) {
          const newPurchase: IPurchase = createInitialPurchase({
            price: Number(newPrice.replace(",", "")),
          });
          additionsDispatch({
            type: ActionType.ADD,
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

  const skeletonHeight = useResponsiveHeight("PurchaseDetailContainer");

  return (
    <>
      {status === apiStatus.loading ? (
        <Skeleton
          variant="rectangular"
          height={skeletonHeight}
          sx={{ bgcolor: blue[50], mt: 1, borderRadius: 2 }}
        />
      ) : (
        <></>
      )}
      <Grid container spacing={1} sx={{ padding: 1, marginTop: 1 }}>
        <Grid item xs={12} sm={6}>
          <SearchStockInput value={input} onChange={onChange} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StyledButton onClick={handleClick} disabled={!input.trim()}>
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
    </>
  );
};

export default AddPurchase;
