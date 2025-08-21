// useMatchedListPage.ts
'use client'

import {useRouter} from 'next/navigation'
import useMatchedTrades from './useMatchedTrades'

export const useMatchedListPage = (ticker: string) => {
  const router = useRouter()
  const {matched, stock, error, isLoading} = useMatchedTrades(ticker)

  const rows = matched.map(m => {
    const q = m.buyTrade.quantity
    const pp = Number(m.sellTrade.price) - Number(m.buyTrade.price)
    const tp = pp * Number(q)
    const r = (tp / (Number(m.buyTrade.price) * Number(q))) * 100

    return {
      id: m.id,
      buyDate: m.buyTrade.tradeAt,
      buyPrice: m.buyTrade.price,
      sellDate: m.sellTrade.tradeAt,
      sellPrice: m.sellTrade.price,
      quantity: q,
      totalProfit: tp,
      rateOfProfit: r,
      isPlus: tp >= 0
    }
  })

  const goDetail = (id: string) => router.push(`/board/${ticker}/matched/${id}`)

  return {
    stock,
    rows,
    error,
    isLoading,
    goDetail
  }
}
