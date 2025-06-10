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
import classNames from 'classnames'
import classes from './index.module.scss'

const Input = (props: CustomInputProps) => {
  const {type, className} = props
  const containerClassName = classNames(classes.container, className)

  const inputMap = {
    password: <PasswordInput {...(props as PasswordInputProps)} />,
    number: <NumberInput {...(props as NumberInputProps)} />,
    text: <TextInput {...(props as TextInputProps)} />
  }

  return (
    <div className={containerClassName}>{inputMap[type] ?? inputMap.text}</div>
  )
}

export default Input
