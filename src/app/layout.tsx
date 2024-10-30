import {getServerSession} from 'next-auth'
import ThemeRegistry from '../common/context/ThemeRegistry'
import SignOutHandler from '@/browser/components/client/SignOutHandler'
// providers
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
import {NextAuthProvider} from '@/common/context/NextAuthProvider'
import ReduxProvider from '@/store/provider'
import SnackbarProvider from '@/common/context/SnackbarProvider'
import {SWRProvider} from '@/common/context/SWRProvider'
// components
import {CssBaseline} from '@mui/material'
import {Header} from '@/browser/components/common/Header'
// Styles
import './globals.css'
// libs
import {authOptions} from '@/common/lib/auth'

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
            <ReduxProvider>
              <SWRProvider>
                {/* <NextAuthProvider session={session}> */}
                <SignOutHandler />
                {/* <TabCounter /> */}
                <Header />
                <SnackbarProvider>
                  <main
                    id="root"
                    className="flex flex-1 w-full max-w-screen-md pt-16 m-auto">
                    {children}
                  </main>
                </SnackbarProvider>
                <div id="overlays"></div>
                <div className="h-3" />
                {/* <Overlays /> */}
                {/* </NextAuthProvider> */}
              </SWRProvider>
            </ReduxProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
