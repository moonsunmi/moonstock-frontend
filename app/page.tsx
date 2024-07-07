import { Metadata } from "next";
import AverageDownPage from "./average-down/page";
import { headers } from "next/headers";
import RegisterHoldingPage from "./register-holding/page";
import RegisterStocksButton from "@/components/stockBoard/RegisterStocksButton";
import StockList from "@/components/stockBoard/StockList";
import { authOptions } from "@/lib/auth";
import { getHoldings } from "@/lib/data";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StockBoardPage from "./stock-board/page";

export default async function Page() {
  const headersList = headers();
  const referer = headersList.get("referer") || "";

  const session = await getServerSession(authOptions);

  let page = "average-down";
  if (referer.includes("stock-board")) {
    page = "stock-board";
  } else if (referer.includes("register-holding")) {
    page = "register-holding";
  }
}

export const metadata: Metadata = {
  title: "MoonStock",
  description: "Good tools for investor",
};
