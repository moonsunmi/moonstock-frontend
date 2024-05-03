"use client";

import ContainerBox from "@/components/UI/ContainerBox";
import NumericInput2 from "@/components/UI/NumericInput2";
import SearchStockInput from "@/components/UI/SearchStockInput";
import StyledButton from "@/components/UI/StyledButton";
import { useStockListContext } from "@/context/StockListContext";
import useInput from "@/hooks/useInput";
import { stripCommas } from "@/utils/formatNumber";
import { FormControl, FormGroup } from "@mui/material";
import { Stock } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function RegisterHoldingPage() {
  const [stockName, , handleNameChange] = useInput("");
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const stockList: Stock[] = useStockListContext();

  async function handlePostAction(formData: FormData) {
    const formCopyData = formData;
    ref.current?.reset();

    const price = stripCommas(formCopyData.get("price")?.toString());
    const quantity = stripCommas(formCopyData.get("quantity")?.toString());
    const stockTicker = stockList.find(
      (stock) => stock.name === stockName
    )?.ticker;

    await fetch(
      `/api/register-holding?price=${price}&quantity=${quantity}&stock-ticker=${stockTicker}`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then(() => router.push("/stock-board"))
      .catch((error) => console.log(error));
  }

  return (
    <ContainerBox
      title="보유 종목 등록하기"
      aria-label="Register holding stocks"
    >
      <form
        ref={ref}
        action={(formData) => {
          handlePostAction(formData);
        }}
      >
        <FormGroup>
          <FormControl>
            <SearchStockInput
              name="stockName"
              value={stockName}
              onChange={handleNameChange}
            />
          </FormControl>

          <FormControl>
            <NumericInput2 name="price" label="가격" />
          </FormControl>

          <FormControl>
            <NumericInput2 name="quantity" label="수량" />
          </FormControl>
        </FormGroup>
        <StyledButton type="submit">등록하기</StyledButton>
        {/* const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
      </Modal> */}
      </form>
    </ContainerBox>
  );
}

export default RegisterHoldingPage;
