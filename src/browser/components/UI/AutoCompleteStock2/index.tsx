import {
  Autocomplete,
  FilterOptionsState,
  TextField,
  createFilterOptions
} from '@mui/material'
import {Stock} from '@prisma/client'
import {ChangeEvent, useEffect, useMemo} from 'react'
import Input from '../Input'
import {CustomInputProps} from '../Input/index.d'
import useSWR from 'swr'
import {useSelector} from '@/store/store'

type AutoCompleteStockProps = {
  // value: string
  // onChange: (event: ChangeEvent<HTMLInputElement>) => void
} & CustomInputProps

const AutoCompleteStock2 = ({
  // value,
  // onChange,
  ...customInputProps
}: AutoCompleteStockProps) => {
  const {userInfo} = useSelector(state => state.auth)
  const {data, error, isLoading} = useSWR<{ok: boolean; stockList: IStock[]}>(
    ['/stocks', userInfo.id],
    {
      fallbackData: {ok: false, stockList: []}
    }
  )
  const {stockList} = data

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
      getOptionLabel={option =>
        typeof option === 'string' ? option : `${option.name}`
      }
      // onChange={handleAutocompleteChange}
      renderInput={params => {
        const {InputProps, inputProps, ...restParams} = params
        return (
          <Input
            {...restParams}
            {...InputProps} // InputProps를 전달합니다
            inputProps={...inputProps}
            label="Select option"
          />
          // <Input
          //   // type="number"
          //   ref={InputProps.ref}
          //   size="sm"
          //   className="w-full"
          //   name="price"
          //   label="종목이름"
          //   placeholder="ex) 삼성전자"
          //   {...{value, onChange}}
          //   onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          //     event.target.select()
          //   }}
          //   {...resParams}
          //   {...customInputProps}
        )
      }}
      // renderOption={(props, option) => (
      //   <li {...props} key={option.ticker}>
      //     {option.ticker.padStart(6, '0')} {option.name}
      //     <span
      //       style={{
      //         marginLeft: 'auto',
      //         fontSize: '10px',
      //         letterSpacing: '-1px'
      //       }}>
      //       {option.market}
      //     </span>
      //   </li>
      // )}
    />
  )
}

export default AutoCompleteStock2
