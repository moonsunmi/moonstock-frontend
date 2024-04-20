import RegisterStocksButton from "@/components/stockBoard/RegisterStocksButton";
import StockList from "@/components/stockBoard/StockList";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <div>
      <StockList />
      <Box display="flex" justifyContent="center" margin={3}>
        <RegisterStocksButton sx={{ width: { xs: "234px", sm: "50%" } }} />
      </Box>
    </div>
  );
}
