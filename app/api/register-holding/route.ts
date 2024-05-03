import { authOptions } from "@/lib/auth";
import { postHolding } from "@/lib/data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id || "";
  const stockTicker = searchParams.get("stock-ticker") || "";
  const quantity = Number(searchParams.get("quantity"));
  const price = Number(searchParams.get("price"));

  const holding = await postHolding({ userId, stockTicker, quantity, price });

  return NextResponse.json(holding);
}
