import { useStockContext } from "@/contexts/stockContext/StockContext";
import { PurchaseType } from "types/stockTypes";
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
