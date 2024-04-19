"use client";
import { Noto_Sans_KR } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const notoSans = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0",
    },
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
  },
});

export default theme;
