import { useStockContext } from "@/contexts/stockContext/StockContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Container, FormGroup, Typography } from "@mui/material";
import useStockInput from "hooks/useStockInput";
import { ActionType } from "types/actionTypes";
import {
  FieldWidth,
  InputField,
  InputFieldName,
  OutputField,
  OutputFieldName,
} from "types/formTypes";
import { StockInfo } from "types/stockTypes";
import { formatNumberToKorean } from "utils/formatNumberToKorean";
import NumberInput from "./NumberInput";

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
  const { inputs, output, handleInput, updateOutput } = useStockInput({
    price: stockInfo.price.toString(),
    quantity: stockInfo.quantity.toString(),
  });

  const { dispatch } = useStockContext();

  const handleRemove = () => {
    dispatch({ type: ActionType.REMOVE_ROW, payload: { id: stockInfo.id } });
  };

  const handleBlur = () => {
    if (inputs.price !== "" && inputs.quantity !== "") {
      updateOutput();
      dispatch({
        type: ActionType.UPDATE_ROW,
        payload: {
          ...stockInfo,
          price: Number(inputs.price),
          quantity: Number(inputs.quantity),
        },
      });
    }
  };

  return (
    <Container sx={{ padding: 1.5 }}>
      <Typography variant="subtitle1">{stockInfo.label}</Typography>
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
