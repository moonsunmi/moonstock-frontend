'use client'

import useSWR from 'swr'
// Components
import {AutoCompleteStock, Button} from '@/browser/components/UI'
import {ChangeEvent, useState} from 'react'

const StockBoardPage = () => {
  const {data, error, isLoading, isValidating} = useSWR<{
    ok: boolean
    holdings: {price: number}[] // <<< holdings type 정리하기 / refresh token 정리하기
  }>('/api/users/holdings', {
    fallbackData: {ok: false, holdings: []}
  })
  const {holdings = []} = data

  console.log('holdings', holdings)
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
  console.log(holdings)
  return (
    <table>
      <thead>
        <tr>
          <td>종목명</td>
          <td>매입금액</td>
          <td>보유수량</td>
        </tr>
      </thead>
      {holdings.length === 0 ? (
        <div>보유주식이 없습니다.</div>
      ) : (
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={index}>
              <td>{holding['name']}</td>
              <td>{holding['price']}</td>
              <td>{holding['quantity']}</td>
            </tr>
          ))}
        </tbody>
      )}
      <div className="p-10">
        {/* <AutoCompleteStock2 />
        <AutoCompleteStock value={stockName} onChange={handleStockChange} /> */}
      </div>
      <Button>보유 주식 등록하기</Button>
    </table>
  )
}

export default StockBoardPage
