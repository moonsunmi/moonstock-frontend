'use client'

import {useCallback, useState} from 'react'
import {useRouter} from 'next/navigation'
// Context
import {useAdditionsContext} from '@/common/context/AdditionsContext'
import {createInitialPurchase} from '@/common/context/initialPurchases'
// Components
import {Skeleton} from '@mui/material'
import Button from '@/common/components/Button'
import PurchaseDetailContainer from './PurchaseDetail'
import SearchStockInput from '../UI/SearchStockInput'
import StatusDescription from './StatusDescription'
// Hooks
import useInput from '@/common/hooks/useInput'
import {useResponsiveHeight} from '@/common/hooks/useResponsiveHeight'
// Types
import {ActionType} from '@/types/actionTypes'
import {apiStatus} from '@/types/apiStatus'
import {APIStockDetail, IPurchase} from '@/types/stockTypes'
// Styles
import {blue} from '@mui/material/colors'

const AddPurchase = () => {
  const [status, setStatus] = useState<apiStatus>(apiStatus.idle)
  const [input, setInput, onChange] = useInput('')
  const route = useRouter()

  const {additions, additionsDispatch} = useAdditionsContext()

  const addPurchase = useCallback(() => {
    const newPurchase: IPurchase = createInitialPurchase()
    additionsDispatch({type: ActionType.ADD, payload: newPurchase})
    setInput('')
  }, [additionsDispatch, setInput])

  const handleClick = async () => {
    setStatus(apiStatus.loading)
    setInput('')

    try {
      const response = await fetch(
        `/api/stock-info?stock-name=${encodeURIComponent(input)}`
      )
      if (!response.ok) {
        const errorData = await response.json()
        console.log('stock-name API call failed', errorData.message)
        setStatus(apiStatus.error)
        return
      }

      const data: APIStockDetail = await response.json()
      if (data && data.totalCount > 0) {
        const newPrice = data.items?.item[0]?.clpr
        if (newPrice) {
          const newPurchase: IPurchase = createInitialPurchase({
            price: Number(newPrice.replace(',', ''))
          })
          additionsDispatch({
            type: ActionType.ADD,
            payload: newPurchase
          })
        }
        setStatus(apiStatus.success)
      } else {
        setStatus(apiStatus.noResult)
      }
    } catch (error) {
      console.error('네트워크 요청 중 에러가 발생했습니다.', error)
      setStatus(apiStatus.error)
    }
  }

  const skeletonHeight = useResponsiveHeight('PurchaseDetailContainer')

  return (
    <>
      {additions.map((purchase: IPurchase) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            dispatch={additionsDispatch}
          />
        )
      })}
      {status === apiStatus.loading ? (
        <Skeleton
          variant="rectangular"
          height={skeletonHeight}
          sx={{bgcolor: blue[50], mt: 1, borderRadius: 2}}
        />
      ) : (
        <></>
      )}
      <div className="flex gap-2">
        <div className="w-1/2">
          <SearchStockInput value={input} onChange={onChange} />
        </div>
        <Button
          onClick={handleClick}
          disabled={!input.trim()}
          className="w-1/4">
          가격 입력
        </Button>
        <Button onClick={addPurchase} className="w-1/4">
          빈칸 추가
        </Button>
      </div>
      <StatusDescription status={status} />
    </>
  )
}

export default AddPurchase
