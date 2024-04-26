// import StockProvider from "@/app/context/stock/StockProvider";
import AdditionsProvider from "@/app/context/additionals/AdditionsProvider";
import AddPurchaseContainer from "./AddPurchaseContainer";
import AdditionalStocks from "./AdditionalStocks";
// import HoldingStock from "./HoldingStock";
import ResultContainer from "./ResultContainer";
import { Stock } from "@prisma/client";

const AverageDown = ({ stockList }: { stockList: Stock[] }) => {
  return (
    <>
      {/* <HoldingStock /> */}
      <AdditionsProvider>
        <AdditionalStocks />
        <AddPurchaseContainer stockList={stockList} />
      </AdditionsProvider>
      <ResultContainer />
    </>
  );
};

export default AverageDown;
