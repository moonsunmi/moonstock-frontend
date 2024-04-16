"use client";

import NavBar from "@/app/ui/NavBar";
import StyledComponentsRegistry from "lib/registry";
import "@/app/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <NavBar />
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
