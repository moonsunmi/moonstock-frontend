import { Stock } from "@/app/types/stockTypes";
import AddPurchase from "./AddPurchase";
import AdditionalStocks from "./AdditionalStocks";
import HoldingStock from "./HoldingStock";
import Result from "./Result";
import StockProvider from "@/app/context/stock/StockProvider";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <StockProvider>
      <HoldingStock />
      <AdditionalStocks />
      <AddPurchase stockList={stockList} />
    </StockProvider>
  );
};

export default AverageDown;
