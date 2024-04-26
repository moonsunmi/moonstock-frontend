import DrawerLeft from "@/components/UI/LeftBar";
import "@/app/globals.css";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MuiThemeProvider from "@/context/theme-provider";
import ThemeRegistry from "../context/ThemeRegistry";

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
          <ThemeRegistry options={{ key: "mui" }}>
            {/* <SessionProvider session={session}> */}
            <DrawerLeft>{children}</DrawerLeft>
          </ThemeRegistry>
          {/* </SessionProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
