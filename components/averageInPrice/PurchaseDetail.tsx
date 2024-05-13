import { ActionType, PurchaseAction } from "@/types/actionTypes";
import { IPurchase } from "@/types/stockTypes";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FormGroup, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { ChangeEvent, Dispatch, useCallback, useMemo } from "react";
import ContainerBox from "../UI/ContainerBox";
import NumericInput from "../UI/NumericInput";

type PurchaseDetailProps = {
  purchase: IPurchase;
  dispatch: Dispatch<PurchaseAction>;
  label: string;
  isDeletable?: boolean;
};

const PurchaseDetail = ({
  purchase,
  dispatch,
  label,
  isDeletable = true,
}: PurchaseDetailProps) => {
  const session = useSession();

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
    <ContainerBox
      title={
        session.data?.user ? `${session.data.user.name} 님의 ${label}` : label
      }
      aria-label="Purchase Detail"
    >
      <FormGroup
        sx={{
          mt: 1.5,
          maxWidth: "md",
        }}
      >
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          <Grid item xs={7} sm={4}>
            <NumericInput
              name="price"
              value={purchase.price}
              label="가격"
              onBlur={dispatchValue}
            />
          </Grid>
          <Grid item xs={5} sm={2}>
            <NumericInput
              name="quantity"
              value={purchase.quantity}
              label="수량"
              onBlur={dispatchValue}
            />
          </Grid>
          <Grid item xs={isDeletable ? 11 : 12} sm={5.5}>
            <NumericInput
              name="investmentAmount"
              value={investmentAmount || ""}
              label="총합"
            />
          </Grid>
          <Grid item xs={1} sm={0.5}>
            {isDeletable ? (
              <RemoveCircleIcon
                color="warning"
                aria-label="Icon To Remove Additional Purchase Field"
                onClick={handleRemove}
                fontSize="small"
              />
            ) : (
              <div style={{ width: 20 }}></div>
            )}
          </Grid>
        </Grid>
      </FormGroup>
    </ContainerBox>
  );
};

export default PurchaseDetail;
