import AverageDown from "@/components/averageInPrice/AverageDown";
import { Box, Container, Paper } from "@mui/material";
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
  const componentType = typeof window === "undefined" ? "server" : "client";
  console.log(`Home ${componentType} component`);

  const results: Stock[] = await getStockList();

  return (
    <Paper component="main" sx={{ margin: 3, padding: 1, mt: 10 }}>
      <AverageDown stockList={results} />
    </Paper>
  );
}
