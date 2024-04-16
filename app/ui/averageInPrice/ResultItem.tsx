import { ListItem } from "@mui/material";
import CalculateGap from "./CalculateGap";
import { formatNumberToKorean } from "utils/formatNumber";
import { FieldValue } from "types/formTypes";

type ResultItemProps = {
  label: string;
  holding: FieldValue;
  currentValue: number;
  unit: "원" | "개";
};

const ResultItem = ({
  label,
  holding,
  currentValue,
  unit,
}: ResultItemProps) => (
  <ListItem>
    <span>
      {label}: {formatNumberToKorean(currentValue)}
      {unit}
    </span>{" "}
    <CalculateGap before={holding} after={currentValue} />
  </ListItem>
);
export default ResultItem;
