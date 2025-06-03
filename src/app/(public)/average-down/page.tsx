// Components
import AverageDownPage from '@/features/averageDown/AverageDownPage'
// import {useSetAtom} from 'jotai'
// import {uiAtom} from '@/common/lib/state'

const Page = () => {
  // const setUi = useSetAtom(uiAtom)

  return (
    <div className="flex flex-col w-full gap-3">
      {/* <HoldingStocks /> */}
      <AverageDownPage />
    </div>
  )
}

export default Page
