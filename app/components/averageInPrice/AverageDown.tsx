import { Stock } from "@/app/types/stockTypes";
import AddPurchase from "./AddPurchase";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import StockProvider from "@/app/context/stock/StockProvider";
import ResultContainer from "./ResultContainer";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <StockProvider>
      <HoldingStock />
      <AdditionalStocks />
      <AddPurchase stockList={stockList} />
      <ResultContainer />
    </StockProvider>
  );
};

export default AverageDown;
