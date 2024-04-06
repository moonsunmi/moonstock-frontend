import { Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { apiStatus } from "types/apiStatus";

const descriptionMessage = {
  [apiStatus.idle]: {
    message: "가격(전날 기준)이 궁금한 종목 이름을 입력해 보세요.",
    color: blue[300],
  },
  [apiStatus.noResult]: {
    message: "종목 이름을 다시 확인해 주세요",
    color: red[300],
  },
  [apiStatus.loading]: {
    message: "loading...",
    color: blue[300],
  },

  [apiStatus.error]: {
    message: "서버 문제로 에러가 발생했습니다. 잠시 후 시도해 주세요.",
    color: red[300],
  },
};

const StatusDescription = ({ status }: { status: apiStatus }) => {
  return (
    <Typography variant="caption" color={descriptionMessage[status].color}>
      {descriptionMessage[status].message}
    </Typography>
  );
};
export default StatusDescription;
