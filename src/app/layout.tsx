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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppRouterCacheProvider>
          <ThemeRegistry options={{key: 'mui'}}>
            <CssBaseline />
            <SWRProvider>
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
            </SWRProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
