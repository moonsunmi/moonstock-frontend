import MatchedPage from '@/features/trade/MatchedPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker
  return <MatchedPage ticker={ticker} />
}

export default Page
