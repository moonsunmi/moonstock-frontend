import {useStockListContext} from '@/common/context/StockListContext'
import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  TextFieldProps,
  createFilterOptions
} from '@mui/material'
import {Stock} from '@prisma/client'
import {ChangeEvent, useMemo} from 'react'

type SearchStockInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
} & TextFieldProps

export function SearchStockInput({
  value,
  onChange,
  ...textFieldProps
}: SearchStockInputProps) {
  const stockList: Stock[] = useStockListContext()
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

    onChange({
      target: {value: valueToSend, name: 'autocomplete'}
    } as React.ChangeEvent<HTMLInputElement>)
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
      renderInput={params => (
        <TextField
          label="종목 이름"
          {...params}
          size="small"
          placeholder="ex) 삼성전자"
          fullWidth
          {...{value, onChange}}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
            event.target.select()
          }}
          {...textFieldProps}
        />
      )}
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
