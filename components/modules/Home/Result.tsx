import { List, ListItemText } from "@mui/material";
import { Purchase } from "types/stockTypes";
import { formatNumberToKorean } from "utils/formatNumberToKorean";

interface CalculationResult {
  totalQuantity: number;
  investmentAmount: number;
  averagePrice: number;
}

const Result = ({ purchases }: { purchases: Purchase[] }) => {
  function calculateWholeStocks(): CalculationResult {
    const initialResult: CalculationResult = {
      totalQuantity: 0,
      investmentAmount: 0,
      averagePrice: 0,
    };

    const result = purchases.reduce(
      (acc, { price: currentPrice, quantity: currentQuantity }) => {
        if (currentPrice !== "" && currentQuantity !== "") {
          return {
            totalQuantity: acc.totalQuantity + currentQuantity,
            investmentAmount:
              acc.investmentAmount + currentPrice * currentQuantity,
            averagePrice: 0,
          };
        }
        return acc;
      },
      initialResult
    );

    if (result.totalQuantity > 0) {
      result.averagePrice = result.investmentAmount / result.totalQuantity;
    }
    return result;
  }

  const { averagePrice, totalQuantity, investmentAmount } =
    calculateWholeStocks();

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
      <ListItemText>
        총 개수: {formatNumberToKorean(totalQuantity)}
      </ListItemText>
      <ListItemText>
        총 투자 금액: {formatNumberToKorean(investmentAmount)}
      </ListItemText>
    </List>
  );
};

export default Result;
