import { TradeDetail } from "../types/stockTypes";
import { useAdditionsContext } from "../context/additionals/AdditionsContext";

const useInvestmentState = () => {
  const { state: additions } = useAdditionsContext();

  // const initialResult: TradeDetail = {
  //   totalQuantity: Number(holding.quantity),
  //   investmentAmount: Number(holding.price) * Number(holding.quantity),
  //   averagePrice: 0,
  // };
  const initialResult: TradeDetail = {
    totalQuantity: 0,
    investmentAmount: 0,
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
