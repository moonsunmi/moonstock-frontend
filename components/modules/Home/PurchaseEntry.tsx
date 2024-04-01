import { useStockContext } from "@/contexts/stockContext/StockContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, FormGroup, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import useStockInput from "hooks/useStockInput";
import { useCallback } from "react";
import styled from "styled-components";
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
  }, [inputs.price, inputs.quantity, dispatch, purchase, updateOutput]);

  const formatNumberToKoreanOrEmpty = (price: string | number) => {
    return price === "" ? "" : formatNumberToKorean(Number(price));
  };

  return (
    <Container
      sx={{ margin: 1, padding: 1, bgcolor: blue[50], width: "auto" }}
      aria-label="Purchase Entry List"
    >
      <Typography variant="subtitle1">{purchase.label}</Typography>
      <FormGroup
        sx={{
          mt: 1.5,
          maxWidth: "md",
        }}
      >
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          <Grid item xs={7} sm={4}>
            <NumberTextField
              fullWidth
              key={`${purchase.id}-${InputFieldName.price}`}
              name={InputFieldName.price}
              label="가격"
              value={formatNumberToKoreanOrEmpty(inputs.price)}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={5} sm={2}>
            <NumberTextField
              fullWidth
              key={`${purchase.id}-${InputFieldName.quantity}`}
              name={InputFieldName.quantity}
              label="수량"
              value={formatNumberToKoreanOrEmpty(inputs.quantity)}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TotalRemoveWrapper>
              <NumberTextField
                key={`${purchase.id}-${OutputFieldName.investmentAmount}`}
                name={OutputFieldName.investmentAmount}
                label="총합"
                value={formatNumberToKoreanOrEmpty(output.investmentAmount)}
                sx={{ flexGrow: 1 }}
                aria-readonly
              />
              <RemoveCircleIcon color="warning" onClick={handleRemove} />
            </TotalRemoveWrapper>
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
};

const TotalRemoveWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  width: 100%;
`;

export default PurchaseEntry;
