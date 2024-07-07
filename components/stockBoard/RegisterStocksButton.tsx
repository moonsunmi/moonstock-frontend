"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";

export default function RegisterStocksButton({ ...rest }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register-holding");
  };

  return (
    <Button variant="outlined" onClick={handleClick} {...rest}>
      <div>
        <AddCircleOutlineIcon />
        <div>보유 종목 등록하기</div>
      </div>
    </Button>
  );
}
