import RegisterStocksButton from "@/components/stockBoard/RegisterStocksButton";
import StockList from "@/components/stockBoard/StockList";
import { authOptions } from "@/lib/auth";
import { getHoldings } from "@/lib/data";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("api/auth/signin");
  }
  const dataRows = (await getHoldings(session.user.id)) || [];

  return (
    <>
      {session?.user && (
        <>
          <StockList dataRows={dataRows} />
          <Box display="flex" justifyContent="center" margin={3}>
            <RegisterStocksButton sx={{ width: { xs: "234px", sm: "50%" } }} />
          </Box>
        </>
      )}
    </>
  ); // TODO. 굳이 위의 것과 함께 할 필요가 있을까?
}
