import { useStockContext } from "@/contexts/stockContext/StockContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Container,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { ChangeEvent, useCallback, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { ActionType } from "types/actionTypes";
import { Purchase, PurchaseType } from "types/stockTypes";

const commonInputprops = {
  style: { textAlign: "right" as const },
};

const readOnlyInputProps = {
  ...commonInputprops,
  readOnly: true,
};

const commonNumericFormatProps = {
  customInput: TextField,
  thousandSeparator: ",",
  allowNegative: false,
  fullWidth: true,
  size: "small" as const,
};

type PurchaseInfoProps = {
  purchase: Purchase;
  label: string;
  purchaseType: PurchaseType;
  isDeletable?: boolean;
};

const PurchaseInfo = ({
  purchase,
  label,
  purchaseType,
  isDeletable = true,
}: PurchaseInfoProps) => {
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
    <Container
      sx={{ margin: 1, padding: 1, bgcolor: blue[50], width: "auto" }}
      aria-label="Purchase Entry List"
    >
      <Typography variant="subtitle1">{label}</Typography>
      <FormGroup
        sx={{
          mt: 1.5,
          maxWidth: "md",
        }}
      >
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          <Grid item xs={7} sm={4}>
            <NumericFormat
              name="price"
              value={purchase.price}
              label="가격"
              onBlur={dispatchValue}
              {...commonNumericFormatProps}
              inputProps={commonInputprops}
            />
          </Grid>
          <Grid item xs={5} sm={2}>
            <NumericFormat
              name="quantity"
              value={purchase.quantity}
              label="수량"
              onBlur={dispatchValue}
              {...commonNumericFormatProps}
              inputProps={commonInputprops}
            />
          </Grid>
          <Grid item xs={isDeletable ? 11 : 12} sm={5.5}>
            <NumericFormat
              name="investmentAmount"
              value={total}
              label="총합"
              {...commonNumericFormatProps}
              inputProps={readOnlyInputProps}
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
    </Container>
  );
};

export default PurchaseInfo;
