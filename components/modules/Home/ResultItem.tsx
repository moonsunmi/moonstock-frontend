import { ListItem } from "@mui/material";
import CalculateGap from "./CalculateGap";
import { formatNumberToKorean } from "utils/formatNumber";
import { FieldNumberValue } from "types/formTypes";

type ResultItemProps = {
  label: string;
  holdingStocks: FieldNumberValue;
  currentValue: number;
  unit: "원" | "개";
};

const ResultItem = ({
  label,
  holdingStocks,
  currentValue,
  unit,
}: ResultItemProps) => {
  return (
    <ListItem>
      <span>
        {label}: {formatNumberToKorean(currentValue)}
        {unit}
      </span>{" "}
      <CalculateGap before={holdingStocks} after={currentValue} />
    </ListItem>
  );
};
export default ResultItem;
