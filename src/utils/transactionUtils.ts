export const oppositeType = (type: TradeType): TradeType => {
  return type === 'BUY' ? 'SELL' : 'BUY'
}
