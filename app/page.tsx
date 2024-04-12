import { sql } from "@vercel/postgres";
import { Metadata } from "next";
import Home from "./home";

export default async function Page() {
  const { rows } = await sql`SELECT * from "Stock"`;

  return <Home />;
}

export const metadata: Metadata = {
  title: "MoonStcok",
  description: "Good tools for investor",
};
