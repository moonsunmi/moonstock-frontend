"use client";

import { CssBaseline, createTheme } from "@mui/material";
import StyledComponentsRegistry from "lib/registry";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme();

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
