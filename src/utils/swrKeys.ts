export const getTradingKey = (ticker: string, accountId: string) => [
  `/api/trade/${ticker}/trading`,
  accountId
]

export const getHoldingsKey = (userId: string) => [
  '/api/users/holdings',
  userId
]

export const getMatchedTradesKey = (ticker: string, userId: string) => [
  `/api/trade/${ticker}/matched`,
  userId
]

export const getTradeInfoKey = (tradeId: string) => [`/api/trade/${tradeId}`]
