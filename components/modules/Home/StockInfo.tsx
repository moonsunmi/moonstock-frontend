import { Span1 } from "@/components/typographies";
import { useStockContext } from "@/contexts/stockContext/StockContext";
import {
  ActionType,
  StockInfoType,
} from "@/contexts/stockContext/stockReducer";
import styled from "@emotion/styled";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { grey } from "@mui/material/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { formatNumberToKorean } from "utils/formatNumberToKorean";
import FormWrapper from "./FormWrapper";
import NumberInput from "./NumberInput";

type Inputs = {
  price: string;
  quantity: string;
  investment: string;
};

const StockInfo = ({
  stockInfo,
  bgColor = grey[200],
}: {
  stockInfo: StockInfoType;
  bgColor?: string;
}) => {
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

  useEffect(() => {}, [stockInfo.price, stockInfo.quantity]);

  return (
    <Wrapper bgColor={bgColor}>
      <Span1>{stockInfo.title}</Span1>
      <FormWrapper>
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
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`;

export default StockInfo;
