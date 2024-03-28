import { useStockContext } from "@/contexts/stockContext/StockContext";
import {
  ActionType,
  StockInfoType,
} from "@/contexts/stockContext/stockReducer";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, FormGroup, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { formatNumberToKorean } from "utils/formatNumberToKorean";
import NumberInput from "./NumberInput";

type Inputs = {
  price: string;
  quantity: string;
  investment: string;
};

const StockInfo = ({ stockInfo }: { stockInfo: StockInfoType }) => {
  const [inputs, setInputs] = useState<Inputs>({
    price: stockInfo.price.toString(),
    quantity: stockInfo.quantity.toString(),
    investment: "",
  });

  const { dispatch } = useStockContext();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value.replaceAll(",", "") });
  };

  const handleRemove = () => {
    dispatch({ type: ActionType.REMOVE_ROW, payload: { id: stockInfo.id } });
  };

  const handleBlur = () => {
    if (inputs.price !== "" && inputs.quantity !== "") {
      let price = Number(inputs.price);
      let quantity = Number(inputs.quantity);

      setInputs({
        ...inputs,
        investment: (price * quantity).toString(),
      });

      dispatch({
        type: ActionType.UPDATE_ROW,
        payload: {
          ...stockInfo,
          price: price,
          quantity: quantity,
        },
      });
    }
  };

  return (
    <Container>
      <Typography variant="h6">{stockInfo.title}</Typography>
      <FormGroup sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3 }}>
        <NumberInput
          id="price"
          name="price"
          label="가격"
          value={
            inputs.price === ""
              ? ""
              : formatNumberToKorean(Number(inputs.price))
          }
          onBlur={handleBlur}
          onChange={handleInput}
        />
        <NumberInput
          id="quantity"
          name="quantity"
          label="수량"
          value={
            inputs.quantity === ""
              ? ""
              : formatNumberToKorean(Number(inputs.quantity))
          }
          onBlur={handleBlur}
          onChange={handleInput}
        />
        <NumberInput
          id="investment"
          name="investment"
          label="총합"
          value={
            inputs.investment === ""
              ? ""
              : formatNumberToKorean(Number(inputs.investment))
          }
          aria-readonly
        />
        <RemoveCircleIcon color="warning" onClick={handleRemove} />
      </FormGroup>
    </Container>
  );
};

export default StockInfo;
