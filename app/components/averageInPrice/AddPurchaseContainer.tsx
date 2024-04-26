"use client";
import { createInitialPurchase } from "@/app/context/stock/initialPurchases";
import { ActionType } from "@/app/types/actionTypes";
import { apiStatus } from "@/app/types/apiStatus";
import { Purchase, APIStockDetail } from "@/app/types/stockTypes";
import { ChangeEvent, useCallback, useState } from "react";
import AddPurchaseView from "./AddPurchaseView";
import { Stock } from "@prisma/client";
import { useAdditionsContext } from "@/app/context/additionals/AdditionsContext";

const AddPurchaseContainer = ({ stockList }: { stockList: Stock[] }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle);

  const { dispatch } = useAdditionsContext();

  const addPurchase = useCallback(() => {
    const newPurchase: Purchase = createInitialPurchase();
    dispatch({ type: ActionType.ADD, payload: newPurchase });
    setUserInput("");
  }, [dispatch]);

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
          dispatch({
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

  return (
    <AddPurchaseView
      handleClick={handleClick}
      userInput={userInput}
      onChange={onChange}
      addPurchase={addPurchase}
      stockList={stockList}
      status={status}
    />
  );
};

export default AddPurchaseContainer;
