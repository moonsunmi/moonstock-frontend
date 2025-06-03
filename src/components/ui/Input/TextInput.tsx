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

    const containerClassName = classNames(classes.container, className)
    const inputClassName = classNames(
      classes.input,
      classes[size],
      classes.text
    )

    return (
      <div className={containerClassName}>
        <input
          ref={ref}
          className={inputClassName}
          value={value}
          type="text"
          onChange={onChange}
          {...rest}
        />
        <label className={classes.label}>{label}</label>
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
export default TextInput
