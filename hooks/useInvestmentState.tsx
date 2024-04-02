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
      state: { holdingStocks, additionalPurchases },
    } = useStockContext();

    const initialResult: CalculationResult = {
      totalQuantity: toNumber(holdingStocks.quantity),
      investmentAmount:
        toNumber(holdingStocks.price) * toNumber(holdingStocks.quantity),
      averagePrice: 0,
    };

    const result = additionalPurchases.reduce((acc, { price, quantity }) => {
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
