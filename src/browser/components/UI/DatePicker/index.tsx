'use client'

import React from 'react'
// Components
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {
  DatePickerProps,
  DatePicker as MuiDatePicker
} from '@mui/x-date-pickers/DatePicker'
// Types
import {TextFieldVariants} from '@mui/material'
// Locales
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3'
import {ko} from 'date-fns/locale/ko'

interface PropTypes extends DatePickerProps<Date> {
  value: Date | null
  onChange: React.Dispatch<React.SetStateAction<Date | null>>
  label?: string
  format?: string
  variant?: TextFieldVariants
  helperText?: string
  required?: boolean
  isClearable?: boolean
}

export default function DatePicker({
  value,
  onChange,
  label,
  format = 'yyyy년 MM월 dd일',
  variant = 'standard',
  helperText,
  required = false,
  isClearable = false,
  ...props
}: PropTypes) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <MuiDatePicker
        value={value}
        onChange={e => {
          if (e !== null) {
            e.setHours(9)
            onChange(e)
          } else {
            onChange(null)
          }
        }}
        label={label}
        format={format}
        slotProps={{
          field: {
            clearable: isClearable,
            onClear: () => onChange(null)
          },
          textField: {
            variant: variant,
            helperText: helperText,
            required: required
          }
        }}
        views={['year', 'month', 'day']}
        timezone="Asia/Seoul"
        {...props}
      />
    </LocalizationProvider>
  )
}
