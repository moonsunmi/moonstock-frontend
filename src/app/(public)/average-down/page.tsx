'use client'
// Components
import Result from '@/browser/components/averageDown/Result'
import AdditionsProvider from '@/common/context/AdditionsProvider'
import HoldingsProvider from '@/common/context/HoldingsProvider'
import HoldingStocks from '@/browser/components/averageDown/HoldingStocks'
import {AddPurchase} from '@/browser/components/averageDown/AddPurchase'
import {Button, Tooltip} from '@/browser/components/UI'
// import {Modal} from '@/browser/components/UI/Modal'
import {useSetAtom} from 'jotai'
import {uiAtom} from '@/common/lib/state'

const AverageDownPage = () => {
  const setUi = useSetAtom(uiAtom)

  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <div className="flex flex-col gap-3">
          <HoldingStocks />
          <AddPurchase />
          <Result />
          <Button onClick={() => setUi(prev => ({...prev, modal: true}))}>
            show Dialog
          </Button>
          <Tooltip />
        </div>
      </AdditionsProvider>
    </HoldingsProvider>
  )
}

export default AverageDownPage
