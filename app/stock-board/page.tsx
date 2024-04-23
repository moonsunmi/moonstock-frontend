import RegisterStocksButton from "@/app/components/stockBoard/RegisterStocksButton";
import StockList from "@/app/components/stockBoard/StockList";
import { Box } from "@mui/material";
import { getHoldings } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const datarows = await getHoldings(1); // It's for test and should be changed with real userId

  return (
    // <SessionProvider session={session}>
    <>
      <StockList datarows={datarows} />
      <Box display="flex" justifyContent="center" margin={3}>
        <RegisterStocksButton sx={{ width: { xs: "234px", sm: "50%" } }} />
      </Box>
    </>
    // </SessionProvider>
  );
}
