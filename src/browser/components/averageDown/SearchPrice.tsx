'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
// Components
import PurchaseDetailContainer from './PurchaseDetail'
import {Button, SearchStockInput} from '../UI'
// Styles

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

const descriptionMessage: Record<ApiStatus, {message: string}> = {
  idle: {
    message: '가격(전날 기준)이 궁금한 종목 이름을 입력해 보세요.'
  },
  noResult: {
    message: '종목 이름을 다시 확인해 주세요'
  },
  loading: {
    message: 'loading...'
  },
  success: {
    message: '가격 정보가 채워졌어요.'
  },
  error: {
    message: '서버 문제로 에러가 발생했습니다. 잠시 후 시도해 주세요.'
  }
}

const SearchPrice = () => {
  // const [status, setStatus] = useState<ApiStatus>('idle')
  // const [input, setInput, onChange] = useInput('')
  // const route = useRouter()

  // const {additions, additionsDispatch} = useAdditionsContext()

  // const handleClick = async () => {
  //   setStatus('loading')
  //   setInput('')

  //   try {
  //     const response = await fetch(
  //       `/api/stock-info?stock-name=${encodeURIComponent(input)}`
  //     )
  //     if (!response.ok) {
  //       const errorData = await response.json()
  //       console.log('stock-name API call failed', errorData.message)
  //       setStatus('error')
  //       return
  //     }

  //     const data: APIStockDetail = await response.json()
  //     if (data && data.totalCount > 0) {
  //       const newPrice = data.items?.item[0]?.clpr
  //       if (newPrice) {
  //         const newPurchase: ITransaction = createInitialPurchase({
  //           price: Number(newPrice.replace(',', ''))
  //         })
  //         additionsDispatch({
  //           type: 'add',
  //           payload: newPurchase
  //         })
  //       }
  //       setStatus('success')
  //     } else {
  //       setStatus('noResult')
  //     }
  //   } catch (error) {
  //     console.error('네트워크 요청 중 에러가 발생했습니다.', error)
  //     setStatus('error')
  //   }
  // }

  return (
    <>
      {/* {additions.map((purchase: ITransaction) => {
        return (
          <PurchaseDetailContainer
            key={purchase.id}
            label="추가 매수"
            purchase={purchase}
            dispatch={additionsDispatch}
          />
        )
      })}
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
      <p>{descriptionMessage[status].message}</p> */}
    </>
  )
}

export default SearchPrice
