import "@/app/globals.css";
import DrawerLeft from "@/components/UI/LeftBar";
import { NextAuthProvider } from "@/context/NextAuthProvider";
import StockListProvider from "@/context/StockListProvider";
import { authOptions } from "@/lib/auth";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Stock } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import ThemeRegistry from "../context/ThemeRegistry";

async function getStockList() {
  try {
    const res = await sql`SELECT * from "stocks"`;
    const rows = res.rows;
    return rows as Stock[];
  } catch (error) {
    console.log("주식 리스트를 가져오는 데 실패했습니다: ", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const stockList: Stock[] = await getStockList();

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: "mui" }}>
            <CssBaseline />
            <NextAuthProvider session={session}>
              <DrawerLeft>
                <StockListProvider stockList={stockList}>
                  {children}
                </StockListProvider>
              </DrawerLeft>
            </NextAuthProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
