import {TextField, TextFieldProps} from '@mui/material'
import {NumericFormat, NumericFormatProps} from 'react-number-format'

const commonNumericFormatProps = {
  customInput: TextField,
  thousandSeparator: ',',
  allowNegative: false,
  fullWidth: true,
  size: 'small' as const,
  style: {textAlign: 'right' as const}
}

type NumericInputProps = {
  label: string
} & NumericFormatProps &
  TextFieldProps

export const NumericInput2 = ({label, ...props}: NumericInputProps) => {
  return (
    <NumericFormat {...props} {...commonNumericFormatProps} label={label} />
  )
}
