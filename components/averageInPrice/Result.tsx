"use client";

import { useHoldingsContext } from "@/context/HoldingsContext";
import useCalculatedInvestment from "@/hooks/useCalculatedInvestment";
import { List, ListItem } from "@mui/material";
import ResultItem from "./ResultItem";

const Result = () => {
  const { holdings } = useHoldingsContext();
  // Currently using first holding for now, but planning to update for handling multiple holdings
  const holding = holdings[0];
  const { averagePrice, totalQuantity, investmentAmount } =
    useCalculatedInvestment();

  const isResultShow: boolean =
    holding.price === "" ||
    holding.quantity === "" ||
    holding.price === 0 ||
    holding.quantity === 0;

  return (
    <List
      sx={{
        borderTop: 2,
        borderColor: "darkslateblue",
      }}
      aria-label="Investment Report"
    >
      {isResultShow ? (
        <ListItem>보유 주식 정보를 입력해 주세요.</ListItem>
      ) : (
        <>
          <ResultItem
            label="평균 단가"
            holding={holding.price}
            currentValue={averagePrice}
            unit="원"
          />
          <ResultItem
            label="총 개수"
            holding={holding.quantity}
            currentValue={totalQuantity}
            unit="개"
          />
          <ResultItem
            label="총 투자금"
            holding={Number(holding.price) * Number(holding.quantity)}
            currentValue={investmentAmount}
            unit="원"
          />
        </>
      )}
    </List>
  );
};

export default Result;
