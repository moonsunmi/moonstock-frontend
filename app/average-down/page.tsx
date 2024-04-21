import AverageDown from "@/components/averageInPrice/AverageDown";
import { sql } from "@vercel/postgres";
import { Stock } from "types/stockTypes";

async function getStockList() {
  try {
    const res = await sql`SELECT * from "Stock"`;
    const rows = res.rows;
    return rows as Stock[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  const results: Stock[] = await getStockList();

  return <AverageDown stockList={results} />;
}
