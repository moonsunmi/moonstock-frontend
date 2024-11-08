'use client'

import {ChangeEvent, useState} from 'react'

import useSWR from 'swr'
// Components
import {Button, Card, Paragraph} from '@/browser/components/UI'
import classes from './index.module.scss'

const TradingPage = () => {
  // const {data, error, isLoading, isValidating} = useSWR<{
  //   holdings: []
  // }>('/api/users/holdings', {fallbackData: {holdings: []}})
  // const {holdings = []} = data

  const holdings = [
    {
      ticker: '123',
      name: '미포',
      totalInvestment: 30
    },
    {
      ticker: '1245',
      name: '민원',
      totalInvestment: 22
    },
    {
      ticker: '1241125',
      name: '협력',
      totalInvestment: 22
    },
    {
      ticker: '1241s5',
      name: '업체',
      totalInvestment: 22
    }
  ]

  // if (error) {
  //   return <div>Error occurred: {error.message}</div>
  // }

  return (
    <div className={classes.container}>
      {holdings.map((holding, index) => (
        <Card key={index}>
          <Paragraph variant="title">{holding['name']}</Paragraph>
          <Paragraph>{`진행중인 투자금: ${holding['totalInvestment']}`}</Paragraph>
          <Paragraph>{`수익률: `}</Paragraph>
        </Card>
      ))}
    </div>
  )
}

export default TradingPage
