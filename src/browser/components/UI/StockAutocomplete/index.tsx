'use client'

import {useState, useMemo} from 'react'
import {TextField, Autocomplete, CircularProgress} from '@mui/material'
import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'

const StockAutocomplete = ({onSelect}: {onSelect: (stock: any) => void}) => {
  const [query, setQuery] = useState('')

  const {userInfo} = useUserStore()

  const {data, error, isLoading} = useSWR<{ok: boolean; stockList: IStock[]}>(
    ['/api/stocks', userInfo.id],
    {
      fallbackData: {ok: false, stockList: []}
    }
  )
  const {stockList} = data

  const filteredStocks = useMemo(() => {
    if (!query) return stockList
    return stockList.filter(stock =>
      `${stock.ticker} ${stock.name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [query, stockList])

  return (
    <Autocomplete
      size="small"
      options={filteredStocks}
      getOptionLabel={option => `${option.ticker} - ${option.name}`}
      filterOptions={options => options} // 클라이언트에서 필터링했으므로 그대로 사용
      onChange={(_, value) => onSelect(value)}
      loading={isLoading}
      noOptionsText="검색 결과 없음"
      renderInput={params => (
        <TextField
          {...params}
          label="종목 검색"
          onChange={event => setQuery(event.target.value.trim())} // 즉시 검색 반영
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

export default StockAutocomplete
