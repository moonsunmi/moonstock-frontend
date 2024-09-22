import {NextAuthProvider} from '@/common/context/NextAuthProvider'
import {authOptions} from '@/common/lib/auth'
import {CssBaseline} from '@mui/material'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
// import {Stock} from '@prisma/client'
import {sql} from '@vercel/postgres'
import {getServerSession} from 'next-auth'
import ThemeRegistry from '../common/context/ThemeRegistry'
import SignOutHandler from '@/browser/components/client/SignOutHandler'
import ReduxProvider from '@/store/provider'
import {Header} from '@/browser/components/common/Header'

// Styles
import './globals.css'
// import {Overlays} from '@/browser/components/UI/Overlays'

async function getStockList() {
  try {
    const res = await sql`SELECT * from "stocks"`
    const rows = res.rows
    // return rows as Stock[]
  } catch (error) {
    console.log('주식 리스트를 가져오는 데 실패했습니다: ', error)
    return []
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  // const stockList: Stock[] = await getStockList()

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppRouterCacheProvider>
          <ThemeRegistry options={{key: 'mui'}}>
            <CssBaseline />
            <ReduxProvider>
              <NextAuthProvider session={session}>
                <SignOutHandler />
                {/* <TabCounter /> */}
                <Header />
                {/* <StockListProvider stockList={stockList}> */}
                <main
                  id="root"
                  className="flex flex-1 w-full max-w-screen-md pt-16 m-auto">
                  {children}
                </main>
                <div id="overlays"></div>
                <div className="h-3" />
                {/* <Overlays /> */}
                {/* </StockListProvider> */}
              </NextAuthProvider>
            </ReduxProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
