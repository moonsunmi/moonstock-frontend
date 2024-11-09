'use client'

import {ChangeEvent, useState} from 'react'

import useSWR from 'swr'
// Components
import {Button, Card, Paragraph} from '@/browser/components/UI'
import classes from './index.module.scss'
import Dialog_Holding from '@/common/dialog/Dialog_Holding'
import {useRouter} from 'next/navigation'
import {useSelector} from '@/store/store'

const TradingPage = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
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
        <Card onClick={() => setOpen(true)}>
          <Paragraph>새 종목으로 거래 시작하기</Paragraph>
        </Card>
      </div>
    </>
  )
}

export default TradingPage
