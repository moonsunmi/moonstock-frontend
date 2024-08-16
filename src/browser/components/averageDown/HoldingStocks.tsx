'use client'

import {useHoldingsContext} from '@/common/context/HoldingsContext'
import PurchaseDetail from './PurchaseDetail'
import Card from '../UI/Card'
import TextField from '../UI/texts/TextField'

const HoldingStocks = () => {
  const {holdings, holdingsDispatch} = useHoldingsContext()

  return (
    <>
      <PurchaseDetail
        label="보유 주식"
        purchase={holdings[0]} // Currently using first holding for now, but planning to update for handling multiple holdings
        dispatch={holdingsDispatch}
        isDeletable={false}
      />
      <Card>
        <p>보유주식</p>
        <TextField />
      </Card>
    </>
  )
}

export default HoldingStocks
