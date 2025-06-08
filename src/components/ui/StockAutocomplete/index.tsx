'use client'

import {useState, useMemo, useRef} from 'react'
import {TextField, Autocomplete} from '@mui/material'
import useSWR from 'swr'
import {getHoldingsKey} from '@/utils/swrKeys'
import {useUserStore} from '@/stores/useUserStore'

type StockAutoCompleteProps = {
  defaultTicker?: IStock['ticker']
  stockList?: IStock[]
  onSelect: (stock: IStock | null) => void
}

const StockAutocomplete = ({
  defaultTicker,
  stockList = [],
  onSelect
}: StockAutoCompleteProps) => {
  const {userInfo} = useUserStore()
  const [query, setQuery] = useState('')
  const hasDefaultTicker = useRef<boolean>(!!defaultTicker)

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

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    getHoldingsKey(userInfo.id)
  )

  const holdings = data?.holdings ?? []
  const disabledTickers = useMemo(() => holdings.map(h => h.ticker), [holdings])

  return (
    <Autocomplete
      size="small"
      options={filteredStocks}
      value={defaultStock}
      disabled={hasDefaultTicker.current || !data || isLoading}
      getOptionLabel={option => `${option.ticker} - ${option.name}`}
      getOptionDisabled={option => disabledTickers.includes(option.ticker)}
      filterOptions={options => options}
      onChange={(_, value) => onSelect(value)}
      noOptionsText="검색 결과 없음"
      renderInput={params => (
        <TextField
          {...params}
          label="종목 검색"
          onChange={event => setQuery(event.target.value.trim())}
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
