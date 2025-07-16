import MatchedListClient from './MatchedListClient'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker
  return <MatchedListClient ticker={ticker} />
}

export default Page
