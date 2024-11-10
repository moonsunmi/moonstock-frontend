'use client'

import {ChangeEvent, useState} from 'react'

import useSWR from 'swr'
// Components
import {Card, Paragraph} from '@/browser/components/UI'
import classes from './index.module.scss'
import {useRouter} from 'next/navigation'
import {useSelector} from '@/store/store'
import {Dialog_Transaction} from '@/common/dialog'

const TradingPage = () => {
  const router = useRouter()
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false)

  const {userInfo} = useSelector(state => state.auth)

  const {data, error, isLoading} = useSWR<{holdings: IStock[]}>(
    ['/api/users/holdings', userInfo.id],
    {fallbackData: {holdings: []}}
  )
  const {holdings} = data

  const handleOnClick = (ticker: string) => {
    router.push(`/trading/${ticker}`)
  }

  return (
    <>
      <div className={classes.container}>
        {holdings.map((holding, index) => (
          <Card key={index} onClick={() => handleOnClick(holding['ticker'])}>
            <Paragraph variant="title">{holding['name']}</Paragraph>
            <Paragraph>{`진행중인 투자금: ${holding['totalInvestment']}`}</Paragraph>
            <Paragraph>{`수익률: `}</Paragraph>
          </Card>
        ))}
        <Card onClick={() => setTransactionOpen(true)}>
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
