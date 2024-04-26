import { TradeDetail } from "../types/stockTypes";
import { useAdditionsContext } from "../context/additionals/AdditionsContext";
import { useHoldingsContext } from "../context/holdings/HoldingsContext";

const useInvestmentState = () => {
  const { additions } = useAdditionsContext();
  const { holdings } = useHoldingsContext();

  const initialResult: TradeDetail = {
    totalQuantity: Number(holdings[0].quantity),
    investmentAmount: Number(holdings[0].price) * Number(holdings[0].quantity),
    averagePrice: 0,
  };

  const result = additions.reduce((acc, { price, quantity }) => {
    const currentPrice = Number(price);
    const currentQuantity = Number(quantity);

    if (price !== 0 && quantity !== 0) {
      return {
        totalQuantity: acc.totalQuantity + currentQuantity,
        investmentAmount: acc.investmentAmount + currentPrice * currentQuantity,
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
};

export default useInvestmentState;
