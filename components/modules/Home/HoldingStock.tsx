import { useStockContext } from "@/contexts/stockContext/StockContext";
import TotalAmountField from "./TotalAmountField";
import { PurchaseType } from "types/stockTypes";

const HoldingStock = () => {
  const {
    state: { holdingStocks },
  } = useStockContext();
  return (
    <>
      <TotalAmountField
        label="보유 주식"
        purchase={holdingStocks}
        purchaseType={PurchaseType.HOLDING_STOCKS}
      />
    </>
  );
};

export default HoldingStock;
