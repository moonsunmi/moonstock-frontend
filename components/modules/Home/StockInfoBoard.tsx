import { Span1 } from "@/components/typographies";
import { useStockContext } from "@/contexts/stockContext/StockContext";
import {
  ActionType,
  StockInfoType,
} from "@/contexts/stockContext/stockReducer";
import styled from "@emotion/styled";
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { ColorTypes, GrayColors } from "styles/colors";
import NumberInput from "./NumberInput";
import FormWrapper from "./FormWrapper";

const StockInfoBoard = memo(({ stockInfo }: { stockInfo: StockInfoType }) => {
  const { dispatch } = useStockContext();

  const handleInputFormat = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const formattedValue =
        value === "" ? "" : isNaN(Number(value)) ? 0 : Number(value);
      dispatch({
        type: ActionType.UPDATE_ROW,
        payload: { ...stockInfo, [name]: formattedValue },
      });
    },
    [dispatch, stockInfo]
  );

  useEffect(() => {
    dispatch({
      type: ActionType.UPDATE_ROW,
      payload: {
        ...stockInfo,
        total: Number(stockInfo.price) * Number(stockInfo.quantity),
      },
    });
  }, [stockInfo.price, stockInfo.quantity]);

  return (
    <Wrapper bgColor={GrayColors.gray100}>
      <Span1>{stockInfo.title}</Span1>
      <FormWrapper>
        <NumberInput
          id="price"
          name="price"
          label="가격"
          value={stockInfo.price}
          onChange={handleInputFormat}
        />
        <NumberInput
          id="quantity"
          name="quantity"
          label="수량"
          value={stockInfo.quantity}
          onChange={handleInputFormat}
        />
        <NumberInput
          id="total"
          name="total"
          label="총합"
          value={stockInfo.total}
          aria-readonly
        />
      </FormWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div<{ bgColor: ColorTypes }>`
  background-color: ${(props) => props.bgColor};
  padding: 5px;
  margin: 5px;
`;

export default StockInfoBoard;
