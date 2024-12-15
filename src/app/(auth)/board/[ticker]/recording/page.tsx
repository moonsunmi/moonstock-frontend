import RecordingPage from '@/browser/pages/RecordingPage'

const Page = async ({params}: {params: Promise<{ticker: string}>}) => {
  const ticker = (await params).ticker
  return <RecordingPage ticker={ticker} />
}

export default Page
