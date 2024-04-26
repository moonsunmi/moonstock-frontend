import { Purchase, TradeDetail } from "@/types/stockTypes";
import { List, ListItem } from "@mui/material";
import ResultItem from "./ResultItem";

type ResultViewProps = {
  isResultShow: boolean;
  holding: Purchase;
  tradeDetail: TradeDetail;
};

const ResultView = ({
  isResultShow,
  holding,
  tradeDetail,
}: ResultViewProps) => {
  const { averagePrice, totalQuantity, investmentAmount } = tradeDetail;
  return (
    <List
      sx={{
        borderTop: 2,
        borderColor: "darkslateblue",
      }}
      aria-label="Investment Report"
    >
      {isResultShow ? (
        <ListItem>보유 주식 정보를 입력해 주세요.</ListItem>
      ) : (
        <>
          <ResultItem
            label="평균 단가"
            holding={holding.price}
            currentValue={averagePrice}
            unit="원"
          />
          <ResultItem
            label="총 개수"
            holding={holding.quantity}
            currentValue={totalQuantity}
            unit="개"
          />
          <ResultItem
            label="총 투자금"
            holding={Number(holding.price) * Number(holding.quantity)}
            currentValue={investmentAmount}
            unit="원"
          />
        </>
      )}
    </List>
  );
};

export default ResultView;
