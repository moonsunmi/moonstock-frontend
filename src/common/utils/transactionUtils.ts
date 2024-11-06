export const oppositeType = (type: TransactionType): TransactionType => {
  return type === 'BUY' ? 'SELL' : 'BUY'
}
