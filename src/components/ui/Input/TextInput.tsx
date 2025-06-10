import React, {forwardRef} from 'react'
import classNames from 'classnames'
import classes from './index.module.scss'
import {CustomInputProps} from './index.d'

const TextInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      value = '',
      label = '',
      onChange,
      ...rest
    } = props

    const inputClassName = classNames(classes.input, classes[size])

    return (
      <>
        <input
          ref={ref}
          className={inputClassName}
          value={value}
          type="text"
          onChange={onChange}
          {...rest}
        />
        <label className={classes.label}>{label}</label>
      </>
    )
  }
)

TextInput.displayName = 'TextInput'
export default TextInput
