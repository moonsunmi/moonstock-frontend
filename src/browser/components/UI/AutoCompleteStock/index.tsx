import {
  Autocomplete,
  FilterOptionsState,
  createFilterOptions
} from '@mui/material'
import {Stock} from '@prisma/client'
import {ChangeEvent, useEffect, useMemo} from 'react'
import Input from '../Input'
import {CustomInputProps} from '../Input/index.d'
import useSWR from 'swr'

type AutoCompleteStockProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
} & CustomInputProps

const AutoCompleteStock = ({
  value,
  onChange,
  ...customInputProps
}: AutoCompleteStockProps) => {
  const {data, error, isLoading} = useSWR<{ok: boolean; stockList: IStock[]}>(
    '/stocks',
    {
      fallbackData: {ok: false, stockList: []}
    }
  )
  const {stockList} = data

  const filter = useMemo(
    () =>
      createFilterOptions<Stock>({
        stringify: option => `${option.ticker.padStart(6, '0')} ${option.name}`
      }),
    []
  )

  const filterOptions = useMemo(() => {
    return (options: Stock[], params: FilterOptionsState<Stock>) => {
      const {inputValue} = params
      if (inputValue === '') return []

      const filtered = filter(options, {...params, inputValue: value})
      return filtered
    }
  }, [filter, value])

  const handleAutocompleteChange = (
    event: any,
    newValue: Stock | string | null
  ) => {
    let valueToSend: string = ''

    if (typeof newValue === 'string') {
      valueToSend = newValue
    } else if (newValue !== null) {
      valueToSend = newValue.name
    }

    const customEvent = {
      target: {
        value: valueToSend,
        name: 'autocomplete'
      }
    } as ChangeEvent<HTMLInputElement>

    onChange(customEvent)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>주식 목록을 불러오는 데 실패했습니다.</div>
  }

  return (
    <Autocomplete
      id="auto-highlight"
      freeSolo
      options={stockList}
      filterOptions={filterOptions}
      getOptionLabel={option =>
        typeof option === 'string' ? option : `${option.name}`
      }
      onChange={handleAutocompleteChange}
      renderInput={params => {
        const {size, InputProps, ...resParams} = params
        return (
          <Input
            // type="number"
            ref={InputProps.ref}
            size="sm"
            className="w-full"
            name="price"
            label="종목이름"
            placeholder="ex) 삼성전자"
            {...{value, onChange}}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              event.target.select()
            }}
            {...resParams}
            {...customInputProps}
          />
        )
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.ticker}>
          {option.ticker.padStart(6, '0')} {option.name}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '10px',
              letterSpacing: '-1px'
            }}>
            {option.market}
          </span>
        </li>
      )}
    />
  )
}

export default AutoCompleteStock
