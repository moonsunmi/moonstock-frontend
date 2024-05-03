"use client";

import StyledButton from "@/components/UI/StyledButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterStocksButton({ ...rest }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register-holding");
  };

  return (
    <>
      <StyledButton {...rest} onClick={handleClick}>
        <div>
          <AddCircleOutlineIcon />
          <div>보유 종목 등록하기</div>
        </div>
      </StyledButton>
    </>
  );
}
