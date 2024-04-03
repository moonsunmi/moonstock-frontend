import { useStockContext } from "@/contexts/stockContext/StockContext";
import { toNumber } from "utils/formatNumber";

const useInvestmentState = () => {
  interface CalculationResult {
    totalQuantity: number;
    investmentAmount: number;
    averagePrice: number;
  }

  function calculateInvestmentState() {
    const {
      state: { holding, additions },
    } = useStockContext();

    const initialResult: CalculationResult = {
      totalQuantity: toNumber(holding.quantity),
      investmentAmount: toNumber(holding.price) * toNumber(holding.quantity),
      averagePrice: 0,
    };

    const result = additions.reduce((acc, { price, quantity }) => {
      const currentPrice = toNumber(price);
      const currentQuantity = toNumber(quantity);

      if (price !== 0 && quantity !== 0) {
        return {
          totalQuantity: acc.totalQuantity + currentQuantity,
          investmentAmount:
            acc.investmentAmount + currentPrice * currentQuantity,
          averagePrice: 0,
        };
      } else {
        return acc;
      }
    }, initialResult);

    if (result.totalQuantity > 0) {
      result.averagePrice = result.investmentAmount / result.totalQuantity;
    }
    return result;
  }
  return { calculateInvestmentState };
};
export default useInvestmentState;
