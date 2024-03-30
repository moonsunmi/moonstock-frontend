import { List, ListItemText } from "@mui/material";
import { StockInfo } from "types/stockTypes";
import { formatNumberToKorean } from "utils/formatNumberToKorean";

interface CalculationResult {
  quantity: number;
  investmentAmount: number;
  averagePrice: number;
}

const Result = ({ stocks }: { stocks: StockInfo[] }) => {
  function calculateWholeStocks(): CalculationResult {
    const initialResult: CalculationResult = {
      quantity: 0,
      investmentAmount: 0,
      averagePrice: 0,
    };

    const result = stocks.reduce((acc, item) => {
      if (item.price !== "" && item.quantity !== "") {
        return {
          quantity: acc.quantity + item.quantity,
          investmentAmount: acc.investmentAmount + item.price * item.quantity,
          averagePrice: 0,
        };
      }
      return acc;
    }, initialResult);

    if (result.quantity > 0) {
      result.averagePrice = result.investmentAmount / result.quantity;
    }
    return result;
  }

  const { averagePrice, quantity, investmentAmount } = calculateWholeStocks();

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
        평균 단가:{formatNumberToKorean(averagePrice.toFixed(2))}
      </ListItemText>
      <ListItemText>총 개수: {formatNumberToKorean(quantity)}</ListItemText>
      <ListItemText>
        총 투자 금액: {formatNumberToKorean(investmentAmount)}
      </ListItemText>
    </List>
  );
};

export default Result;
