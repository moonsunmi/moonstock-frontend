'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
// Context
import {useAdditionsContext} from '@/common/context/AdditionsContext'
import {createInitialPurchase} from '@/common/context/initialPurchases'
// Components
import {Skeleton, Typography} from '@mui/material'
import PurchaseDetailContainer from './PurchaseDetail'
import SearchStockInput from '../UI/SearchStockInput'
import Button from '../UI/Button'
// Hooks
import useInput from '@/common/hooks/useInput'
import {useResponsiveHeight} from '@/common/hooks/useResponsiveHeight'
// Styles
import {blue} from '@mui/material/colors'
import {fontColor} from '@/common/lib/color'

type APIStockDetail = {
  numOfRows: number
  pageNo: number
  totalCount: number
  items: {
    item: [
      {
        basDt: string
        srtnCd: string
        isinCd: string
        itmsNm: string
        mrktCtg: string
        clpr: string
        vs: string
        fltRt: string
        mkp: string
        hipr: string
        lopr: string
        trqu: string
        trPrc: string
        lstgStCnt: string
        mrktTotAmt: string
      }
    ]
  }
}

const descriptionMessage: Record<ApiStatus, {message: string; color: string}> =
  {
    idle: {
      message: '가격(전날 기준)이 궁금한 종목 이름을 입력해 보세요.',
      color: fontColor.info
    },
    noResult: {
      message: '종목 이름을 다시 확인해 주세요',
      color: fontColor.error
    },
    loading: {
      message: 'loading...',
      color: fontColor.info
    },
    success: {
      message: '가격 정보가 채워졌어요.',
      color: fontColor.info
    },
    error: {
      message: '서버 문제로 에러가 발생했습니다. 잠시 후 시도해 주세요.',
      color: fontColor.error
    }
  }

const SearchPrice = () => {
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [input, setInput, onChange] = useInput('')
  const route = useRouter()

  const {additions, additionsDispatch} = useAdditionsContext()

  const handleClick = async () => {
    setStatus('loading')
    setInput('')

    try {
      const response = await fetch(
        `/api/stock-info?stock-name=${encodeURIComponent(input)}`
      )
      if (!response.ok) {
        const errorData = await response.json()
        console.log('stock-name API call failed', errorData.message)
        setStatus('error')
        return
      }

      const data: APIStockDetail = await response.json()
      if (data && data.totalCount > 0) {
        const newPrice = data.items?.item[0]?.clpr
        if (newPrice) {
          const newPurchase: ITransaction = createInitialPurchase({
            price: Number(newPrice.replace(',', ''))
          })
          additionsDispatch({
            type: 'add',
            payload: newPurchase
          })
        }
        setStatus('success')
      } else {
        setStatus('noResult')
      }
    } catch (error) {
      console.error('네트워크 요청 중 에러가 발생했습니다.', error)
      setStatus('error')
    }
  }

  const skeletonHeight = useResponsiveHeight('PurchaseDetailContainer')

  return (
    <>
      {additions.map((purchase: ITransaction) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            dispatch={additionsDispatch}
          />
        )
      })}
      {status === 'loading' ? (
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
          className="w-1/2">
          가격 입력
        </Button>
      </div>
      <Typography variant="caption" color={descriptionMessage[status].color}>
        {descriptionMessage[status].message}
      </Typography>
    </>
  )
}

export default SearchPrice
