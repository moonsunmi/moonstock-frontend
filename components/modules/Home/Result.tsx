import { List, ListItemText } from "@mui/material";
import { StockInfo } from "types/stockTypes";
import { formatNumberToKorean } from "utils/formatNumberToKorean";

const Result = ({ stocks }: { stocks: StockInfo[] }) => {
  function calculateWholeStocks() {
    let quantity = 0;
    let InvestmentAmount = 0;
    stocks.map((item) => {
      quantity += item.price === "" ? 0 : Number(item.quantity);
      InvestmentAmount += Number(item.price) * Number(item.quantity);
    });
    let price: number | "" = quantity === 0 ? "" : InvestmentAmount / quantity;
    return { price, quantity, InvestmentAmount };
  }

  const { price, quantity, InvestmentAmount } = calculateWholeStocks();

  return (
    <List
      sx={{
        padding: "10px",
        borderTop: 2,
        borderColor: "darkslateblue",
      }}
      aria-label="Investment Report"
    >
      <ListItemText>
        평균 단가: {price === "" ? "-" : formatNumberToKorean(price.toFixed(2))}
      </ListItemText>
      <ListItemText>총 개수: {formatNumberToKorean(quantity)}</ListItemText>
      <ListItemText>
        총 투자 금액: {formatNumberToKorean(InvestmentAmount)}
      </ListItemText>
    </List>
  );
};

export default Result;
