import { getServerSession } from "next-auth";
// Components
import StockList from "@/browser/components/stockBoard/StockList";
import { authOptions } from "@/common/lib/auth";
import { getHoldings } from "@/common/lib/data";

export default async function StockBoardPage() {
  const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   redirect("api/auth/signin");
  // }
  const dataRows = (await getHoldings(session?.user.id || "")) || [];

  return <>{session?.user && <StockList dataRows={dataRows} />}</>;
}
