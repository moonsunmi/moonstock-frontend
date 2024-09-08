import DrawerLeft from '@/browser/components/UI/LeftBar'
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
import {AuthProvider} from '@/common/context'
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
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry options={{key: 'mui'}}>
            <CssBaseline />
            <AuthProvider>
              <NextAuthProvider session={session}>
                <SignOutHandler />
                {/* <TabCounter /> */}
                <Header />
                <ReduxProvider>
                  {/* 하단의 것 지우기 */}
                  {/* <StockListProvider stockList={stockList}> */}
                  <div
                    id="root"
                    className="max-w-screen-md p-3 m-auto"
                    // todo.
                    // flex: 1;
                    // display: flex;
                    // justify-content: center;
                    // align-items: center;
                    // padding: 20px;
                    // max-width: 1200px;
                    // margin: 0 auto; /* 중앙 정렬을 위한 자동 마진 */
                  >
                    {children}
                  </div>
                  <div id="overlays"></div>
                  {/* <Overlays /> */}
                  {/* </StockListProvider> */}
                </ReduxProvider>
              </NextAuthProvider>
            </AuthProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
