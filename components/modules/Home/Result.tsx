import { useStockContext } from "@/contexts/stockContext/StockContext";
import { List } from "@mui/material";
import useInvestmentState from "hooks/useInvestmentState";
import ResultItem from "./ResultItem";

const Result = () => {
  const {
    state: { holdingStocks },
  } = useStockContext();
  const { calculateInvestmentState } = useInvestmentState();
  const { averagePrice, totalQuantity, investmentAmount } =
    calculateInvestmentState();

  return (
    <List
      sx={{
        borderTop: 2,
        borderColor: "darkslateblue",
      }}
      aria-label="Investment Report"
    >
      <ResultItem
        label="평균 단가"
        holdingStocks={holdingStocks.price}
        currentValue={averagePrice}
        unit="원"
      />
      <ResultItem
        label="총 개수"
        holdingStocks={holdingStocks.quantity}
        currentValue={totalQuantity}
        unit="개"
      />
      <ResultItem
        label="총 투자금"
        holdingStocks={
          Number(holdingStocks.price) * Number(holdingStocks.quantity)
        }
        currentValue={investmentAmount}
        unit="원"
      />
    </List>
  );
};

export default Result;
