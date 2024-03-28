import { CssBaseline, createTheme } from "@mui/material";
import "app/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
