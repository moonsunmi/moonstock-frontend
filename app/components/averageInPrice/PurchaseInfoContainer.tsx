import { useStockContext } from "@/app/context/stock/StockContext";
import { ActionType } from "@/app/types/actionTypes";
import { Purchase, PurchaseType } from "@/app/types/stockTypes";
import { ChangeEvent, useCallback, useMemo } from "react";
import PurchaseInfoView from "./PurchaseInfoView";

type PurchaseInfoContainerProps = {
  purchase: Purchase;
  label: string;
  purchaseType: PurchaseType;
  isDeletable?: boolean;
};

const PurchaseInfoContainer = ({
  purchase,
  label,
  purchaseType,
  isDeletable = true,
}: PurchaseInfoContainerProps) => {
  const { dispatch } = useStockContext();

  const handleRemove = useCallback(() => {
    dispatch({
      type: ActionType.REMOVE_ADDITIONAL,
      payload: { id: purchase.id },
    });
  }, [dispatch, purchase.id]);

  const dispatchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type:
          purchaseType === PurchaseType.ADDITIONS
            ? ActionType.UPDATE_ADDITIONAL
            : ActionType.UPDATE_HOLDING,
        payload: {
          ...purchase,
          [event.target.name]: Number(event.target.value.replaceAll(",", "")),
        },
      });
    },
    [dispatch, purchase, purchaseType]
  );

  const total = useMemo(() => {
    if (purchase.price !== "" && purchase.quantity !== "")
      return Number(purchase.price) * Number(purchase.quantity);
  }, [purchase.price, purchase.quantity]);

  return (
    <PurchaseInfoView
      label={label}
      purchase={purchase}
      total={total}
      isDeletable={isDeletable}
      dispatchValue={dispatchValue}
      handleRemove={handleRemove}
    />
  );
};

export default PurchaseInfoContainer;
