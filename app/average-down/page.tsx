// Components
import AddPurchase from "@/browser/components/averageDown/AddPurchase";
import HoldingStocks from "@/browser/components/averageDown/HoldingStocks";
import Result from "@/browser/components/averageDown/Result";
import Card from "@/common/components/Card";
import AdditionsProvider from "@/common/context/AdditionsProvider";
import HoldingsProvider from "@/common/context/HoldingsProvider";

const AverageDownPage = () => {
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <div className="flex flex-col gap-3">
          <Card>card is ready</Card>
          <HoldingStocks />
          <AddPurchase />
          <Result />
        </div>
      </AdditionsProvider>
    </HoldingsProvider>
  );
};

export default AverageDownPage;
