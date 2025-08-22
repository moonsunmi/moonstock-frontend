import MatchedListPage from '@/features/trade/matchedList/components/MatchedListPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker
  return <MatchedListPage ticker={ticker} />
}

export default Page
