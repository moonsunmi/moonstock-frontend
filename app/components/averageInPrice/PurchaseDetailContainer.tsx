// import { useStockContext } from "@/app/context/stock/StockContext";
import { ActionType } from "@/app/types/actionTypes";
import { Purchase, PurchaseType } from "@/app/types/stockTypes";
import { ChangeEvent, useCallback, useMemo } from "react";
import PurchaseDetailView from "./PurchaseDetailView";
import { useAdditionsContext } from "@/app/context/additionals/AdditionsContext";

type PurchaseDetailContainerProps = {
  purchase: Purchase;
  label: string;
  purchaseType: PurchaseType;
  isDeletable?: boolean;
};

const PurchaseDetailContainer = ({
  purchase,
  label,
  purchaseType,
  isDeletable = true,
}: PurchaseDetailContainerProps) => {
  const { dispatch } = useAdditionsContext();

  const handleRemove = useCallback(() => {
    dispatch({
      type: ActionType.REMOVE,
      payload: { id: purchase.id },
    });
  }, [dispatch, purchase.id]);

  const dispatchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: ActionType.UPDATE,
        payload: {
          ...purchase,
          [event.target.name]: Number(event.target.value.replaceAll(",", "")),
        },
      });
    },
    [dispatch, purchase, purchaseType]
  );

  const investmentAmount = useMemo(() => {
    if (purchase.price !== "" && purchase.quantity !== "")
      return Number(purchase.price) * Number(purchase.quantity);
  }, [purchase.price, purchase.quantity]);

  return (
    <PurchaseDetailView
      label={label}
      purchase={purchase}
      investmentAmount={investmentAmount}
      isDeletable={isDeletable}
      dispatchValue={dispatchValue}
      handleRemove={handleRemove}
    />
  );
};

export default PurchaseDetailContainer;
