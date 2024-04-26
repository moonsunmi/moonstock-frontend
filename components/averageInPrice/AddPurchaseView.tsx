import { apiStatus } from "@/types/apiStatus";
import { Grid } from "@mui/material";
import { ChangeEvent } from "react";
import SearchBox from "../UI/SearchBox";
import StatusDescription from "./StatusDescription";
import StyledButton from "../UI/StyledButton";
import { Stock } from "@prisma/client";

type AddPurchaseViewProps = {
  handleClick: () => Promise<void>;
  userInput: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addPurchase: () => void;
  stockList: Stock[];
  status: apiStatus;
};

const AddPurchaseView = ({
  handleClick,
  userInput,
  onChange,
  addPurchase,
  status,
  stockList,
}: AddPurchaseViewProps) => {
  return (
    <Grid container spacing={1} sx={{ padding: 1, marginTop: 1 }}>
      <Grid item xs={12} sm={6}>
        <SearchBox
          value={userInput}
          onChange={onChange}
          stockList={stockList}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StyledButton onClick={handleClick} disabled={!userInput.trim()}>
          가격 입력
        </StyledButton>
      </Grid>
      <Grid item xs={6} sm={3}>
        <StyledButton onClick={addPurchase}>빈칸 추가</StyledButton>
      </Grid>
      <Grid item xs={12} sm={9}>
        <StatusDescription status={status} />
      </Grid>
    </Grid>
  );
};

export default AddPurchaseView;
