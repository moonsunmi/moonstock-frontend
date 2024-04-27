"use client";

import { useAdditionsContext } from "@/context/AdditionsContext";
import { createInitialPurchase } from "@/context/initialPurchases";
import { useResponsiveHeight } from "@/hooks/useResponsiveHeight";
import { ActionType } from "@/types/actionTypes";
import { apiStatus } from "@/types/apiStatus";
import { APIStockDetail, Purchase } from "@/types/stockTypes";
import { Grid, Skeleton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Stock } from "@prisma/client";
import { ChangeEvent, useCallback, useState } from "react";
import SearchBox from "../UI/SearchBox";
import StyledButton from "../UI/StyledButton";
import StatusDescription from "./StatusDescription";

const AddPurchase = ({ stockList }: { stockList: Stock[] }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle);

  const { additionsDispatch } = useAdditionsContext();

  const addPurchase = useCallback(() => {
    const newPurchase: Purchase = createInitialPurchase();
    additionsDispatch({ type: ActionType.ADD, payload: newPurchase });
    setUserInput("");
  }, [additionsDispatch]);

  const handleClick = async () => {
    setStatus(apiStatus.loading);
    setUserInput("");

    try {
      const response = await fetch(
        `/api/stock-info?stockName=${encodeURIComponent(userInput)}`
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
          const newPurchase: Purchase = createInitialPurchase({
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
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
          <SearchBox
            value={userInput}
            onChange={onChange}
            stockList={stockList}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StyledButton onClick={handleClick} disabled={!userInput.trim()}>
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
