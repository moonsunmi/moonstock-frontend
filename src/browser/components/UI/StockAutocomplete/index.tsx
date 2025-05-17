'use client'

import {useState, useMemo} from 'react'
import {TextField, Autocomplete} from '@mui/material'

type StockAutoCompleteProps = {
  defaultTicker?: IStock['ticker']
  stockList: IStock[]
  onSelect: (stock: any) => void
}

const StockAutocomplete = ({
  defaultTicker,
  stockList,
  onSelect
}: StockAutoCompleteProps) => {
  const [query, setQuery] = useState('')

  const filteredStocks = useMemo(() => {
    if (!query) return stockList
    return stockList.filter(stock =>
      `${stock.ticker} ${stock.name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [query, stockList])

  const defaultStock = useMemo(() => {
    if (!defaultTicker) return null
    return filteredStocks.find(stock => stock.ticker === defaultTicker)
  }, [defaultTicker, filteredStocks])

  return (
    <Autocomplete
      size="small"
      options={filteredStocks}
      value={defaultStock}
      getOptionLabel={option => `${option.ticker} - ${option.name}`}
      filterOptions={options => options} // 클라이언트에서 필터링했으므로 그대로 사용
      onChange={(_, value) => onSelect(value)}
      noOptionsText="검색 결과 없음"
      renderInput={params => (
        <TextField
          {...params}
          label="종목 검색"
          onChange={event => setQuery(event.target.value.trim())} // 즉시 검색 반영
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>
          }}
        />
      )}
    />
  )
}

export default StockAutocomplete
