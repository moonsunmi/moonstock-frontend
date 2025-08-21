import MatchedListPage from '@/features/trade/matched_list/components/MatchedListPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker
  return <MatchedListPage ticker={ticker} />
}

export default Page
