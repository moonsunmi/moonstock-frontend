'use client'

import {ChangeEvent, useState} from 'react'

import useSWR from 'swr'
// Components
import {Button, Card, Paragraph} from '@/browser/components/UI'
import classes from './index.module.scss'
import Dialog_Holding from '@/common/dialog/Dialog_Holding'
import {useRouter} from 'next/navigation'

const TradingPage = () => {
  // const {data, error, isLoading, isValidating} = useSWR<{
  //   transactions: []
  // }>('/api/users/transactions', {fallbackData: {transactions: []}})
  // const {transactions = []} = data
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const transactions = [
    {
      ticker: '10620',
      name: '현대미포조선'
      // totalInvestment: 30
    },
    {
      ticker: '60310',
      name: '3S'
      // totalInvestment: 22
    },
    {
      ticker: '300720',
      name: '한일시멘트'
      // totalInvestment: 22
    },
    {
      ticker: '45226K',
      name: '한화갤러리아우'
      // totalInvestment: 22
    }
  ]

  // if (error) {
  //   return <div>Error occurred: {error.message}</div>
  // }

  const handleOnClick = (ticker: string) => {
    router.push(`/trading/${ticker}`)
  }

  return (
    <>
      <div className={classes.container}>
        {transactions.map((transaction, index) => (
          <Card
            key={index}
            onClick={() => handleOnClick(transaction['ticker'])}>
            <Paragraph variant="title">{transaction['name']}</Paragraph>
            <Paragraph>{`진행중인 투자금: ${transaction['totalInvestment']}`}</Paragraph>
            <Paragraph>{`수익률: `}</Paragraph>
          </Card>
        ))}
        <Card onClick={() => setOpen(true)}>
          <Paragraph>새 종목으로 거래 시작하기</Paragraph>
        </Card>
      </div>
    </>
  )
}

export default TradingPage
