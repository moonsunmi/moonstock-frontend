import {getServerSession} from 'next-auth'
import ThemeRegistry from '../common/context/ThemeRegistry'
// providers
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
import SnackbarProvider from '@/providers/SnackbarProvider'
import {SWRProvider} from '@/providers/SWRProvider'
// components
import {CssBaseline} from '@mui/material'
import {Header} from '@/components/common/Header'
// Styles
import './globals.css'
// libs
import {authOptions} from '@/utils/auth'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppRouterCacheProvider>
          <ThemeRegistry options={{key: 'mui'}}>
            <CssBaseline />
            <SWRProvider>
              {/* <NextAuthProvider session={session}> */}
              {/* <TabCounter /> */}
              <Header />
              <SnackbarProvider>
                <main
                  id="root"
                  className="flex justify-center flex-1 w-full max-w-screen-lg pt-24 m-auto">
                  {children}
                </main>
              </SnackbarProvider>
              <div id="overlays"></div>
              <div className="h-3" />
              {/* <Overlays /> */}
              {/* </NextAuthProvider> */}
            </SWRProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
