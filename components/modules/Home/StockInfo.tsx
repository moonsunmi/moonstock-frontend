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
  InvestmentAmount: string;
};

type InputField = {
  id: keyof Inputs;
  name: keyof Inputs;
  label: string;
  readOnly?: boolean;
};

const StockInfo = ({ stockInfo }: { stockInfo: StockInfoType }) => {
  const [inputs, setInputs] = useState<Inputs>({
    price: stockInfo.price.toString(),
    quantity: stockInfo.quantity.toString(),
    InvestmentAmount: "",
  });

  const { dispatch } = useStockContext();

  const inputFields: InputField[] = [
    { id: "price", name: "price", label: "가격" },
    { id: "quantity", name: "quantity", label: "수량" },
    {
      id: "InvestmentAmount",
      name: "InvestmentAmount",
      label: "투자금액",
      readOnly: true,
    },
  ];

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
        InvestmentAmount: (price * quantity).toString(),
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
        {inputFields.map((field) => (
          <NumberInput
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            value={
              inputs[field.name] === ""
                ? ""
                : formatNumberToKorean(Number(inputs[field.name]))
            }
            onBlur={field.readOnly ? undefined : handleBlur}
            onChange={field.readOnly ? undefined : handleInput}
            aria-readonly={field.readOnly}
          />
        ))}
        <RemoveCircleIcon color="warning" onClick={handleRemove} />
      </FormGroup>
    </Container>
  );
};

export default StockInfo;
