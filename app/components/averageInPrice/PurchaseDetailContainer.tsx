import { useAdditionsContext } from "@/app/context/additionals/AdditionsContext";
import { ActionType } from "@/app/types/actionTypes";
import { Purchase } from "@/app/types/stockTypes";
import { ChangeEvent, useCallback, useMemo } from "react";
import PurchaseDetailView from "./PurchaseDetailView";

type PurchaseDetailContainerProps = {
  purchase: Purchase;
  label: string;
  isDeletable?: boolean;
};

const PurchaseDetailContainer = ({
  purchase,
  label,
  isDeletable = true,
}: PurchaseDetailContainerProps) => {
  const { additionDispatch } = useAdditionsContext();

  const handleRemove = useCallback(() => {
    additionDispatch({
      type: ActionType.REMOVE,
      payload: { id: purchase.id },
    });
  }, [additionDispatch, purchase.id]);

  const dispatchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      additionDispatch({
        type: ActionType.UPDATE,
        payload: {
          ...purchase,
          [event.target.name]: Number(event.target.value.replaceAll(",", "")),
        },
      });
    },
    [additionDispatch, purchase]
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
