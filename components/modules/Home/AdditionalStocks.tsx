import { useStockContext } from "@/contexts/stockContext/StockContext";

import { Purchase, PurchaseType } from "types/stockTypes";
import PurchaseInfo from "./PurchaseInfo";

const AdditionalStocks = () => {
  const {
    state: { additions },
  } = useStockContext();

  return (
    <>
      {additions.map((purchase: Purchase) => {
        return (
          <PurchaseInfo
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            purchaseType={PurchaseType.ADDITIONS}
          />
        );
      })}
    </>
  );
};

export default AdditionalStocks;
