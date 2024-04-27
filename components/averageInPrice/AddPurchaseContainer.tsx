"use client";

import { useAdditionsContext } from "@/context/AdditionsContext";
import { createInitialPurchase } from "@/context/initialPurchases";
import { ActionType } from "@/types/actionTypes";
import { apiStatus } from "@/types/apiStatus";
import { APIStockDetail, Purchase } from "@/types/stockTypes";
import { Skeleton } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Stock } from "@prisma/client";
import { ChangeEvent, useCallback, useState } from "react";
import AddPurchaseView from "./AddPurchaseView";
import { useResponsiveHeight } from "@/hooks/useResponsiveHeight";

const AddPurchaseContainer = ({ stockList }: { stockList: Stock[] }) => {
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

      <AddPurchaseView
        handleClick={handleClick}
        userInput={userInput}
        onChange={onChange}
        addPurchase={addPurchase}
        stockList={stockList}
        status={status}
      />
    </>
  );
};

export default AddPurchaseContainer;
