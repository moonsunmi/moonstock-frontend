type InputField = 'price' | 'quantity'

export type Inputs = {
  [key in InputField]: string
}

export type Output = {
  investmentAmount: string
}

export type FieldValue = '' | number

export const valueChangeIndicator = {
  even: {symbol: '-', color: 'gray'},
  decrease: {symbol: '↓', color: 'blue'},
  increase: {symbol: '↑', color: 'red'}
}
