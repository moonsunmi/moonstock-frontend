import StockProvider from "@/app/context/stock/StockProvider";
import { Stock } from "@/app/types/stockTypes";
import AddPurchaseContainer from "./AddPurchaseContainer";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import ResultContainer from "./ResultContainer";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <StockProvider>
      <HoldingStock />
      <AdditionalStocks />
      <AddPurchaseContainer stockList={stockList} />
      <ResultContainer />
    </StockProvider>
  );
};

export default AverageDown;
