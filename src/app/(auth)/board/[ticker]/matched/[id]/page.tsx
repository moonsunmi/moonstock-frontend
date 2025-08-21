import MatchedDetailPage from '@/features/trade/matched_detail/components/MatchedDetailPage'

const Page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  return <MatchedDetailPage id={id} />
}

export default Page
