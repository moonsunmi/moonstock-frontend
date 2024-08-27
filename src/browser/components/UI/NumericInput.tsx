import {ChangeEvent} from 'react'

import {TextField} from '@mui/material'
import {NumericFormat} from 'react-number-format'

const commonInputProps = {
  style: {textAlign: 'right' as const}
}

const readOnlyInputProps = {
  ...commonInputProps,
  readOnly: true
}

const commonNumericFormatProps = {
  customInput: TextField,
  thousandSeparator: ',',
  allowNegative: false,
  fullWidth: true,
  size: 'small' as const
}

type NumericInputProps = {
  name: string
  value: number | ''
  label: string
  readOnly?: boolean
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const NumericInput = ({
  name,
  value,
  label,
  readOnly = false,
  onBlur
}: NumericInputProps) => {
  return (
    <NumericFormat
      name={name}
      value={value}
      label={label}
      onBlur={onBlur}
      {...commonNumericFormatProps}
      inputProps={readOnly ? readOnlyInputProps : commonInputProps}
    />
  )
}
