import { useStockContext } from "@/app/context/stock/StockContext";
import { PurchaseType } from "@/app/types/stockTypes";
import PurchaseInfo from "./PurchaseInfo";

const HoldingStock = () => {
  const {
    state: { holding },
  } = useStockContext();

  return (
    <>
      <PurchaseInfo
        label="보유 주식"
        purchase={holding}
        purchaseType={PurchaseType.HOLDING}
        isDeletable={false}
      />
    </>
  );
};

export default HoldingStock;
