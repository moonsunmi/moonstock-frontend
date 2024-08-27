import {ReactNode} from 'react'
import RequireAuth from '@/app/(auth)/RequireAuth'

export default function StockBoardLayout({children}: {children: ReactNode}) {
  return (
    // <SessionProvider session={session}>
    <section>
      <RequireAuth>{children}</RequireAuth>
    </section>
    // </SessionProvider>
  )
}
