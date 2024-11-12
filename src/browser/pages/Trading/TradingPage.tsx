'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
// Components
import {Card, Paragraph} from '@/browser/components/UI'
import {Dialog_Transaction} from '@/common/dialog'
// Hooks
import useGetHoldings from '@/common/hooks/fetch/useHoldings'
// Etcs.
import classes from './index.module.scss'

const TradingPage = () => {
  const router = useRouter()
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false)

  const {data, error, isLoading} = useGetHoldings()

  const {holdings} = data

  const handleOnClick = (ticker: string) => {
    router.push(`/trading/${ticker}`)
  }

  return (
    <>
      <div className="w-full grid grid-cols-auto-fill-minmax gap-8">
        {holdings.map((holding, index) => (
          <Card
            key={index}
            className="h-48"
            onClick={() => handleOnClick(holding['ticker'])}>
            <Paragraph variant="title">{holding['name']}</Paragraph>
            <Paragraph>{`진행중인 투자금: ${holding['totalInvestment']}`}</Paragraph>
            <Paragraph>{`수익률: `}</Paragraph>
          </Card>
        ))}
        <Card className="h-48" onClick={() => setTransactionOpen(true)}>
          <Paragraph>새 종목으로 거래 시작하기</Paragraph>
        </Card>
      </div>
      <Dialog_Transaction
        open={transactionOpen}
        onClose={() => setTransactionOpen(false)}
      />
    </>
  )
}

export default TradingPage
