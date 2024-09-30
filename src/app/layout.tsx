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
import {SWRConfig} from 'swr'
import axios from 'axios'
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
              <SWRConfig
                value={{
                  refreshInterval: 3000
                  //   revalidateOnMount: true, // 컴포넌트가 마운트되었을 때 자동 갱신 여부
                  //   revalidateOnFocus: false, // 창이 포커싱되었을 때 자동 갱신 여부
                  //   revalidateOnReconnect: false, // 브라우저가 네트워크 연결을 다시 얻었을 때 자동 갱신 여부
                  //   dedupingInterval: 3000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거(ms)
                  //   loadingTimeout: 30000, // 최대 로딩 시간(ms)
                  //   errorRetryCount: 3, // 에러 재시도 최대 횟수
                  //   errorRetryInterval: 5000, // 에러 재시도 인터벌
                }}>
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
              </SWRConfig>
            </ReduxProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
