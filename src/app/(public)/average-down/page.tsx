'use client'
// Components
import AdditionsProvider from '@/common/context/AdditionsProvider'
import HoldingsProvider from '@/common/context/HoldingsProvider'
import {AddPurchase} from '@/browser/components/averageDown/AddPurchase'
// import {useSetAtom} from 'jotai'
import {uiAtom} from '@/common/lib/state'

const AverageDownPage = () => {
  // const setUi = useSetAtom(uiAtom)

  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <div className="flex flex-col w-full gap-3">
          {/* <HoldingStocks /> */}
          <AddPurchase />
        </div>
      </AdditionsProvider>
    </HoldingsProvider>
  )
}

export default AverageDownPage
