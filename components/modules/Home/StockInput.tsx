import { useStockContext } from "@/contexts/stockContext/StockContext";
import { ActionType, StockInfo } from "@/contexts/stockContext/stockReducer";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, FormGroup, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { formatNumberToKorean } from "utils/formatNumberToKorean";
import NumberInput from "./NumberInput";

enum InputFieldName {
  price = "price",
  quantity = "quantity",
}

enum OutputFieldName {
  investmentAmount = "investmentAmount",
}

enum FieldWidth {
  small = 100,
  medium = 115,
  big = 180,
}

type Inputs = {
  [InputFieldName.price]: string;
  [InputFieldName.quantity]: string;
};

type Output = {
  [OutputFieldName.investmentAmount]: string;
};

interface InputField {
  name: InputFieldName;
  label: string;
  width: number;
}

interface OutputField {
  name: OutputFieldName;
  label: string;
  width: number;
}

const inputFields: InputField[] = [
  { name: InputFieldName.price, label: "가격", width: FieldWidth.medium },
  { name: InputFieldName.quantity, label: "수량", width: FieldWidth.small },
];

const outputField: OutputField = {
  name: OutputFieldName.investmentAmount,
  label: "투자금액",
  width: FieldWidth.big,
};

const StockInput = ({ stockInfo }: { stockInfo: StockInfo }) => {
  const [inputs, setInputs] = useState<Inputs>({
    price: stockInfo.price.toString(),
    quantity: stockInfo.quantity.toString(),
  });

  const [output, setOutput] = useState<Output>({ investmentAmount: "" });

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

      setOutput({ investmentAmount: (price * quantity).toString() });

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
    <Container sx={{ padding: 1.5 }}>
      <Typography variant="h7">{stockInfo.label}</Typography>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 1.5 }}
      >
        {inputFields.map((field) => (
          <NumberInput
            key={`${stockInfo.id}-${field.name}`}
            name={field.name}
            label={field.label}
            sx={{ width: field.width }}
            value={
              inputs[field.name] === ""
                ? ""
                : formatNumberToKorean(Number(inputs[field.name]))
            }
            onBlur={handleBlur}
            onChange={handleInput}
          />
        ))}
        <NumberInput
          key={`${stockInfo.id}-${outputField.name}`}
          name={outputField.name}
          label={outputField.label}
          sx={{ width: outputField.width }}
          value={
            output.investmentAmount === ""
              ? ""
              : formatNumberToKorean(Number(output.investmentAmount))
          }
          aria-readonly={true}
        />
        <RemoveCircleIcon color="warning" onClick={handleRemove} />
      </FormGroup>
    </Container>
  );
};

export default StockInput;
