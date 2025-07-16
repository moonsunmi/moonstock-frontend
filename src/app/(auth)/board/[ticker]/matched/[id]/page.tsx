import MatchedDetailClient from './MatchedDetailClient'

const Page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  return <MatchedDetailClient id={id} />
}

export default Page
