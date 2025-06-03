'use client'

import {createContext, useContext} from 'react'

const StockListContext = createContext<IStock[] | null>(null)

const useStockListContext = () => {
  const stockList = useContext(StockListContext)

  if (!stockList) {
    throw new Error('')
  }
  return stockList
}

export {StockListContext, useStockListContext}
