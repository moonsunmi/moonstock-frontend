import AddPurchase from "@/components/averageInPrice/AddPurchase";
import AdditionStocks from "@/components/averageInPrice/AdditionStocks";
import HoldingStocks from "@/components/averageInPrice/HoldingStocks";
import Result from "@/components/averageInPrice/Result";
import AdditionsProvider from "@/context/AdditionsProvider";
import HoldingsProvider from "@/context/HoldingsProvider";

const AverageDownPage = () => {
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <HoldingStocks />
        <AdditionStocks />
        <AddPurchase />
        <Result />
      </AdditionsProvider>
    </HoldingsProvider>
  );
};

export default AverageDownPage;
