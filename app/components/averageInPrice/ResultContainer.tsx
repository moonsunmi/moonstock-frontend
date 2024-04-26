"use client";
import useInvestmentState from "@/app/hooks/useInvestmentState";
import ResultView from "./ResultView";

const ResultContainer = () => {
  const {
    state: { holding },
  } = useStockContext();
  const result = useInvestmentState();

  const isResultShow: boolean =
    holding.price === "" ||
    holding.quantity === "" ||
    holding.price === 0 ||
    holding.quantity === 0;

  return (
    <ResultView
      isResultShow={isResultShow}
      holding={holding}
      tradeDetail={result}
    />
  );
};

export default ResultContainer;
