export const getTradingKey = (ticker: string, accountId: string) => [
  `/api/trade/${ticker}/trading`,
  accountId
]
