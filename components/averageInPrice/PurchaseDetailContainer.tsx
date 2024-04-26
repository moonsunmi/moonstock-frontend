import { useAdditionsContext } from "@/context/AdditionsContext";
import { ActionType, PurchaseAction } from "@/types/actionTypes";
import { Purchase } from "@/types/stockTypes";
import { ChangeEvent, Dispatch, useCallback, useMemo } from "react";
import PurchaseDetailView from "./PurchaseDetailView";

type PurchaseDetailContainerProps = {
  purchase: Purchase;
  dispatch: Dispatch<PurchaseAction>;
  label: string;
  isDeletable?: boolean;
};

const PurchaseDetailContainer = ({
  purchase,
  dispatch,
  label,
  isDeletable = true,
}: PurchaseDetailContainerProps) => {
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
    [dispatch, purchase]
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
