import { useStockContext } from "@/contexts/stockContext/StockContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, FormGroup, Typography } from "@mui/material";
import useStockInput from "hooks/useStockInput";
import { useCallback } from "react";
import { fieldWidths } from "styles/width";
import { ActionType } from "types/actionTypes";
import { InputFieldName, OutputFieldName } from "types/formTypes";
import { Purchase } from "types/stockTypes";
import { formatNumberToKorean } from "utils/formatNumberToKorean";
import NumberTextField from "./NumberTextField";

const PurchaseEntry = ({ purchase }: { purchase: Purchase }) => {
  const { inputs, output, handleInput, updateOutput } = useStockInput({
    price: purchase.price.toString(),
    quantity: purchase.quantity.toString(),
  });

  const { dispatch } = useStockContext();

  const handleRemove = useCallback(() => {
    dispatch({ type: ActionType.REMOVE_ROW, payload: { id: purchase.id } });
  }, [dispatch, purchase.id]);

  const handleBlur = useCallback(() => {
    if (inputs.price !== "" && inputs.quantity !== "") {
      updateOutput();
      dispatch({
        type: ActionType.UPDATE_ROW,
        payload: {
          ...purchase,
          price: Number(inputs.price),
          quantity: Number(inputs.quantity),
        },
      });
    }
  }, [inputs.price, inputs.quantity, dispatch]);

  return (
    <Container sx={{ padding: 1.5 }} aria-label="Purchase Entry List">
      <Typography variant="subtitle1">{purchase.label}</Typography>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}
      >
        <NumberTextField
          key={`${purchase.id}-${InputFieldName.price}`}
          name={InputFieldName.price}
          label="가격"
          value={
            inputs.price === ""
              ? ""
              : formatNumberToKorean(Number(inputs.price))
          }
          sx={{ width: fieldWidths.medium }}
          onBlur={handleBlur}
          onChange={handleInput}
        />
        <NumberTextField
          key={`${purchase.id}-${InputFieldName.quantity}`}
          name={InputFieldName.quantity}
          label="수량"
          value={
            inputs.quantity === ""
              ? ""
              : formatNumberToKorean(Number(inputs.quantity))
          }
          sx={{ width: fieldWidths.small }}
          onBlur={handleBlur}
          onChange={handleInput}
        />
        <NumberTextField
          key={`${purchase.id}-${OutputFieldName.investmentAmount}`}
          name={OutputFieldName.investmentAmount}
          label="총합"
          value={
            output.investmentAmount === ""
              ? ""
              : formatNumberToKorean(Number(output.investmentAmount))
          }
          sx={{ width: fieldWidths.big }}
          aria-readonly
        />
        <RemoveCircleIcon color="warning" onClick={handleRemove} />
      </FormGroup>
    </Container>
  );
};

export default PurchaseEntry;
