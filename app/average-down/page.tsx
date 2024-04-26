import AverageDown from "@/app/components/averageInPrice/AverageDown";
import { Stock } from "@prisma/client";
import { sql } from "@vercel/postgres";

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
