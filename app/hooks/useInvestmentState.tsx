import { useStockContext } from "@/app/context/stock/StockContext";

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
      totalQuantity: Number(holding.quantity),
      investmentAmount: Number(holding.price) * Number(holding.quantity),
      averagePrice: 0,
    };

    const result = additions.reduce((acc, { price, quantity }) => {
      const currentPrice = Number(price);
      const currentQuantity = Number(quantity);

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
