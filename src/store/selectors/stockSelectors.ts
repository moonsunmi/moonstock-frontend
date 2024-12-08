import {Holding} from '@prisma/client'
import {createSelector} from '@reduxjs/toolkit'

export const holdingByTicker = createSelector(
  state => state.stock?.holdings,
  holdings =>
    (ticker: string): IStock =>
      holdings?.findLast(holding => holding.ticker === ticker)
)
