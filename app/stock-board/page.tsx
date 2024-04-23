// "use client";
import StockList from "@/app/components/stockBoard/StockList";
import { getHoldings } from "@/app/lib/data";

export default async function Page() {
  const datarows = await getHoldings(1); // It's for test and should be changed with real userId

  return <StockList datarows={datarows} />;
}
