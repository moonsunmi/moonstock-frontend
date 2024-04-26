"use client";

import { useHoldingsContext } from "@/app/context/holdings/HoldingsContext";
import useInvestmentState from "@/app/hooks/useInvestmentState";
import ResultView from "./ResultView";

const ResultContainer = () => {
  const { holdings } = useHoldingsContext();
  const result = useInvestmentState();

  const isResultShow: boolean =
    holdings[0].price === "" ||
    holdings[0].quantity === "" ||
    holdings[0].price === 0 ||
    holdings[0].quantity === 0;
  // Currently using first holding for now, but planning to update for handling multiple holdings

  return (
    <ResultView
      isResultShow={isResultShow}
      holding={holdings[0]}
      tradeDetail={result}
    />
  );
};

export default ResultContainer;
