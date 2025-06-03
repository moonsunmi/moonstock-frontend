import React, {forwardRef} from 'react'
import classNames from 'classnames'
import classes from './index.module.scss'
import {NumericFormat} from 'react-number-format'
import {NumberInputProps} from './index.d'

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      value = '',
      label = '',
      type,
      defaultValue,
      onChange,
      ...rest
    } = props

    const containerClassName = classNames(classes.container, className)
    const inputClassName = classNames(
      classes.input,
      classes[size],
      classes.number
    )

    return (
      <div className={containerClassName}>
        <NumericFormat
          type="text"
          getInputRef={ref}
          className={inputClassName}
          value={value}
          thousandSeparator
          inputMode="numeric"
          onValueChange={values => {
            const fakeEvent = {
              target: {
                value: values.value
              }
            } as React.ChangeEvent<HTMLInputElement>
            onChange?.(fakeEvent)
          }}
          {...rest}
        />
        <label className={classes.label}>{label}</label>
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
