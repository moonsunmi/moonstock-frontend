"use client";

import DrawerLeft from "@/app/components/LeftBar";
import "@/app/ui/globals.css";
import theme from "@/app/utils/theme";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {/* <SessionProvider session={session}> */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DrawerLeft>{children}</DrawerLeft>
          </ThemeProvider>
          {/* </SessionProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
