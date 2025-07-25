import TickerPage from '@/features/trade/trading/TradingPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker

  return <TickerPage ticker={ticker} />
}

export default Page
