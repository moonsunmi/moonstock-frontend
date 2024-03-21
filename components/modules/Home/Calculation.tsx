import { PrimaryColors } from "styles/colors";
import StockInfoBoard from "./StockInfoBorad";

const Calculation = () => {
  return (
    <>
      <StockInfoBoard title="보유 주식" />
      <StockInfoBoard title="추가 매수" />
      <StockInfoBoard title="최종 보유" bgColor={PrimaryColors.var100} />
    </>
  );
};

export default Calculation;
