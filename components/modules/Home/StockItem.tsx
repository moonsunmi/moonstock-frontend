import { H1, H2 } from "@/components/typographies";
import styled from "@emotion/styled";

export interface HistoryItemContent {
  name: string;
  price: number;
}
const StockItem = ({ name, price }: HistoryItemContent) => {
  return (
    <ItemWrapper>
      <ItemTitle>
        <H1>{name}</H1>
        <H2>{price}</H2>
      </ItemTitle>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
`;

const ItemTitle = styled.div`
  display: flex;
  justify-content: column;
`;

export default StockItem;
