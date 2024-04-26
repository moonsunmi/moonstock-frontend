import StyledButton from "@/components/UI/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ButtonProps } from "@mui/material";

export default function RegisterStocksButton({ ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      <div>
        <AddCircleOutlineIcon />
        <div>보유 종목 등록하기</div>
      </div>
    </StyledButton>
  );
}
