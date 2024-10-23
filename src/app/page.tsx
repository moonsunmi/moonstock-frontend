import {Metadata} from 'next'
import AverageDownPage from './(public)/average-down/page'
import {headers} from 'next/headers'
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
    return <AverageDownPage />
  } else if (isMobile) {
    return <AverageDownPage />
  } else {
    return <div>NOT SUPPORT DEVICE</div>
  }
}

export const metadata: Metadata = {
  title: 'MoonStock',
  description: 'Good tools for investor'
}
