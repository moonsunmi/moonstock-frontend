"use client";

import { createInitialPurchase } from "@/context/initialPurchases";
import { ActionType } from "@/types/actionTypes";
import { apiStatus } from "@/types/apiStatus";
import { Purchase, APIStockDetail } from "@/types/stockTypes";
import { ChangeEvent, useCallback, useState } from "react";
import AddPurchaseView from "./AddPurchaseView";
import { Stock } from "@prisma/client";
import { useAdditionsContext } from "@/context/AdditionsContext";

const AddPurchaseContainer = ({ stockList }: { stockList: Stock[] }) => {
  const [userInput, setUserInput] = useState<string>("");
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle);

  const { additionDispatch } = useAdditionsContext();

  const addPurchase = useCallback(() => {
    const newPurchase: Purchase = createInitialPurchase();
    additionDispatch({ type: ActionType.ADD, payload: newPurchase });
    setUserInput("");
  }, [additionDispatch]);

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
          additionDispatch({
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
