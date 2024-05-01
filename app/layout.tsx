import "@/app/globals.css";
import DrawerLeft from "@/components/UI/LeftBar";
import { authOptions } from "@/lib/auth";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "../context/ThemeRegistry";
import { NextAuthProvider } from "@/context/NextAuthProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{ key: "mui" }}>
            <CssBaseline />
            <NextAuthProvider session={session}>
              <DrawerLeft>{children}</DrawerLeft>
            </NextAuthProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
