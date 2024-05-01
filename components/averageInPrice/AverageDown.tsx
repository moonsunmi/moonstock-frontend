import AdditionsProvider from "@/context/AdditionsProvider";
import HoldingsProvider from "@/context/HoldingsProvider";
import { Stock } from "@prisma/client";
import AddPurchase from "./AddPurchase";
import AdditionStocks from "./AdditionStocks";
import HoldingStocks from "./HoldingStocks";
import Result from "./Result";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <HoldingStocks />
        <AdditionStocks />
        <AddPurchase stockList={stockList} />
        <Result />
      </AdditionsProvider>
    </HoldingsProvider>
  );
};

export default AverageDown;
