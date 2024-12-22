import RecordingDetailPage from '@/browser/pages/RecordingDetailPage'

const Page = async ({params}: {params: Promise<{id: string}>}) => {
  const id = (await params).id
  return <RecordingDetailPage id={id} />
}

export default Page
