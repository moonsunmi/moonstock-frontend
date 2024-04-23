"use client";
import { Noto_Sans_KR } from "next/font/google";
import { createTheme } from "@mui/material/styles";

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

export default theme;
