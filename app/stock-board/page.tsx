import RegisterStocksButton from "@/components/stockBoard/RegisterStocksButton";
import StockList from "@/components/stockBoard/StockList";
import { Box } from "@mui/material";
import { getHoldings } from "../lib/data";

export default async function Page() {
  const datarows = await getHoldings(1); // It's for test and should be changed with real userId

  return (
    <div>
      <StockList datarows={datarows} />
      <Box display="flex" justifyContent="center" margin={3}>
        <RegisterStocksButton sx={{ width: { xs: "234px", sm: "50%" } }} />
      </Box>
    </div>
  );
}
