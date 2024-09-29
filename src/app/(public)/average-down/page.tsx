'use client'
// Components
import {AddPurchase} from '@/browser/components/averageDown/AddPurchase'
// import {useSetAtom} from 'jotai'
import {uiAtom} from '@/common/lib/state'

const AverageDownPage = () => {
  // const setUi = useSetAtom(uiAtom)

  return (
    <div className="flex flex-col w-full gap-3">
      {/* <HoldingStocks /> */}
      <AddPurchase />
    </div>
  )
}

export default AverageDownPage
