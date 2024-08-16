import {Metadata} from 'next'
import AverageDownPage from './average-down/page'
import {headers} from 'next/headers'
import RegisterHoldingPage from './register-holding/page'
import {authOptions} from '@/common/lib/auth'
import {getHoldings} from '@/common/lib/data'
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
import StockBoardPage from './stock-board/page'
import {getSelectorsByUserAgent} from 'react-device-detect'

export default async function Page() {
  const headersList = headers()
  // const referer = headersList.get("referer") || "";
  // const session = await getServerSession(authOptions);
  // let page = "average-down";
  // if (referer.includes("stock-board")) {
  //   page = "stock-board";
  // } else if (referer.includes("register-holding")) {
  //   page = "register-holding";
  // }
  const userAgent = headersList.get('user-agent')
  const {isBrowser, isMobile} = getSelectorsByUserAgent(userAgent ?? '')

  if (isBrowser) {
    return (
      <div className="max-w-3xl">
        <AverageDownPage />
      </div>
    )
  } else if (isMobile) {
    return (
      <div className="max-w-3xl">
        <AverageDownPage />
      </div>
    )
  } else {
    return <div>NOT SUPPORT DEVICE</div>
  }
}

export const metadata: Metadata = {
  title: 'MoonStock',
  description: 'Good tools for investor'
}
