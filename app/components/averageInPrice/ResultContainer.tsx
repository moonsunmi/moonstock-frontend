"use client";
import { useStockContext } from "@/app/context/stock/StockContext";
import useInvestmentState from "@/app/hooks/useInvestmentState";
import ResultView from "./ResultView";

const ResultContainer = () => {
  const {
    state: { holding },
  } = useStockContext();
  const { calculateInvestmentState } = useInvestmentState();
  const calculationResult = calculateInvestmentState();

  const isResultShow: boolean =
    holding.price === "" ||
    holding.quantity === "" ||
    holding.price === 0 ||
    holding.quantity === 0;

  return (
    <ResultView
      isResultShow={isResultShow}
      holding={holding}
      calculationResult={calculationResult}
    />
  );
};

export default ResultContainer;
