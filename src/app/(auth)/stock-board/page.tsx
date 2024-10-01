'use client'
import {Button} from '@/browser/components/UI'
// Components
import useSWR from 'swr'

export default function StockBoardPage() {
  const {data, error, isLoading, isValidating} = useSWR(
    [`http://localhost:4000/users/holdings`],
    {fallbackData: [{ok: false, holdings: []}]}
  )
  const {holdings} = data

  if (isLoading || isValidating) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>
  }

  return (
    <div>
      {holdings.length === 0 ? (
        <div>보유주식이 없습니다.</div>
      ) : (
        holdings.map((holding, index) => <div key={index}>{holding}</div>)
      )}
      <Button>보유 주식 등록하기</Button>
    </div>
  )
}
