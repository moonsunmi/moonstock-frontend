"use client";

import "@/app/ui/globals.css";
import DrawerLeft from "@/components/LeftBar";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "utils/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DrawerLeft>{children}</DrawerLeft>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
