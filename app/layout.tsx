"use client";

import { CssBaseline, createTheme } from "@mui/material";
import StyledComponentsRegistry from "lib/registry";
import { ThemeProvider } from "styled-components";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme();

  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>{children}</body>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
