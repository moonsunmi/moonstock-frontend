import DrawerLeft from '@/browser/components/UI/LeftBar'
import {NextAuthProvider} from '@/common/context/NextAuthProvider'
import StockListProvider from '@/common/context/StockListProvider'
import {authOptions} from '@/common/lib/auth'
import {CssBaseline} from '@mui/material'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
// import {Stock} from '@prisma/client'
import {sql} from '@vercel/postgres'
import {getServerSession} from 'next-auth'
import ThemeRegistry from '../common/context/ThemeRegistry'
import SignOutHandler from '@/browser/components/client/SignOutHandler'
import TabCounter from '@/browser/components/client/TabCounter'
import ReduxProvider from '@/store/provider'
import {AuthProvider} from '@/common/context'

// Styles
import './globals.css'

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
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{key: 'mui'}}>
            <CssBaseline />
            <AuthProvider>
              <NextAuthProvider session={session}>
                <SignOutHandler />
                {/* <TabCounter /> */}
                <DrawerLeft>
                  <ReduxProvider>
                    {/* 하단의 것 지우기 */}
                    {/* <StockListProvider stockList={stockList}> */}
                    {children}
                    {/* </StockListProvider> */}
                  </ReduxProvider>
                </DrawerLeft>
              </NextAuthProvider>
            </AuthProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
