export const valueChangeIndicator = {
  even: {symbol: '-', color: 'gray'},
  decrease: {symbol: '↓', color: 'blue'},
  increase: {symbol: '↑', color: 'red'}
}

export enum ActionType {
  ADD = 'add',
  UPDATE = 'update',
  REMOVE = 'remove'
}

export enum apiStatus {
  idle = 'idle',
  loading = 'loading',
  error = 'error',
  success = 'success',
  noResult = 'noResult'
}

export enum PurchaseType {
  HOLDING = 'holding',
  ADDITIONS = 'additions'
}
