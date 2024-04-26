import AdditionsProvider from "@/context/AdditionsProvider";
import HoldingsProvider from "@/context/HoldingsProvider";
import { Stock } from "@prisma/client";
import AddPurchaseContainer from "./AddPurchaseContainer";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import ResultContainer from "./ResultContainer";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <HoldingStock />
        <AdditionalStocks />
        <AddPurchaseContainer stockList={stockList} />
        <ResultContainer />
      </AdditionsProvider>
    </HoldingsProvider>
  );
};

export default AverageDown;
