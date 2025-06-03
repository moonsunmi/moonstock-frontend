'use client'

import {
  CustomInputProps,
  NumberInputProps,
  PasswordInputProps,
  TextInputProps
} from './index.d'
import TextInput from './TextInput'
import NumberInput from './NumberInput'
import PasswordInput from './PasswordInput'

const Input = (props: CustomInputProps) => {
  const {type, ...rest} = props
  if (props.type === 'password')
    return <PasswordInput {...(props as PasswordInputProps)} />
  else if (props.type === 'number')
    return <NumberInput {...(props as NumberInputProps)} />
  return <TextInput {...(props as TextInputProps)} />
}
export default Input
