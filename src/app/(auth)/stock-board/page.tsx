'use client'

import useSWR from 'swr'
// Components
import {AutoCompleteStock, Button} from '@/browser/components/UI'
import {ChangeEvent, useState} from 'react'

const StockBoardPage = () => {
  const {data, error, isLoading, isValidating} = useSWR<{
    holdings: []
  }>('/api/users/holdings', {fallbackData: {holdings: []}})

  const {holdings = []} = data

  const [stockName, setStockName] = useState('')
  if (isLoading || isValidating) {
    return <div>Loading...</div>
  }

  const handleStockChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStockName(event.target.value)
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>
  }

  return (
    <div className="w-full">
      <div className="flex w-full">
        <div className="w-2/12">
          <div>종목명</div>
          <div>매입금액</div>
          <div>보유수량</div>
        </div>
      </div>
      {holdings.length === 0 ? (
        <div>보유주식이 없습니다.</div>
      ) : (
        <div>
          {holdings.map((holding, index) => (
            <div key={index}>
              <div>{holding['name']}</div>
              <div>{holding['price']}</div>
              <div>{holding['quantity']}</div>
            </div>
          ))}
        </div>
      )}
      <div className="p-10">
        {/* <AutoCompleteStock2 />
        <AutoCompleteStock value={stockName} onChange={handleStockChange} /> */}
      </div>
      <Button>보유 주식 등록하기</Button>
    </div>
  )
}

export default StockBoardPage
