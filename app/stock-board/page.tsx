import StockList from "@/components/stockBoard/StockList";
import { getHoldings } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(); // it's for server component. getSession is for client component.

  console.log(session);
  if (!session?.user) {
    redirect("api/auth/signin");
  }

  const dataRows = await getHoldings(session.user.id); // It's for test and should be changed with real userId
  return <>{session?.user && <StockList dataRows={dataRows} />}</>; // TODO. 굳이 위의 것과 함께 할 필요가 있을까?
}
