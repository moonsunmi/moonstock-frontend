import TradingTickerPage from '@/browser/pages/Trading/TradingTickerPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker

  return <TradingTickerPage ticker={ticker} />
}

export default Page
