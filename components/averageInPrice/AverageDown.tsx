import AdditionsProvider from "@/context/AdditionsProvider";
import HoldingsProvider from "@/context/HoldingsProvider";
import { Stock } from "@prisma/client";
import AddPurchaseContainer from "./AddPurchaseContainer";
import AdditionStocks from "./AdditionStocks";
import HoldingStocks from "./HoldingStocks";
import ResultContainer from "./ResultContainer";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <HoldingStocks />
        <AdditionStocks />
        <AddPurchaseContainer stockList={stockList} />
        <ResultContainer />
      </AdditionsProvider>
    </HoldingsProvider>
  );
};

export default AverageDown;
