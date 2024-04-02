import Box from "@mui/material/Box";
import { blue, grey, red } from "@mui/material/colors";
import { FieldNumberValue } from "types/formTypes";
import { formatNumberToKorean, toNumber } from "utils/formatNumber";

type CalculateGapProps = {
  before: FieldNumberValue | number;
  after: FieldNumberValue | number;
};

const CalculateGap = ({ before, after }: CalculateGapProps) => {
  const gap = toNumber(before) - toNumber(after);
  const upOrDown: { symbol: "-" | "↓" | "↑"; color: string } =
    gap === 0
      ? { symbol: "-", color: grey[600] }
      : gap > 0
      ? { symbol: "↓", color: blue[800] }
      : { symbol: "↑", color: red[800] };

  const amount =
    gap === 0 ? "변화 없음" : `${formatNumberToKorean(Math.abs(gap))} `;

  return (
    <Box component="span" color={upOrDown.color}>
      ({amount}
      {upOrDown.symbol})
    </Box>
  );
};
export default CalculateGap;
