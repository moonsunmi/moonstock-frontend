"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";

const notoSans = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
