import { Stock } from "@/app/types/stockTypes";
import AddPurchase from "./AddPurchaseView";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import StockProvider from "@/app/context/stock/StockProvider";
import ResultContainer from "./ResultContainer";
import AddPurchaseContainer from "./AddPurchaseContainer";

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
