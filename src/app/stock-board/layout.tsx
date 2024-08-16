import { ReactNode } from "react";

export default function StockBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // <SessionProvider session={session}>
    <section>{children}</section>
    // </SessionProvider>
  );
}
