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

    const inputClassName = classNames(
      classes.input,
      classes[size],
      'text-right'
    )

    return (
      <>
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
                name: props.name,
                value: values.value
              }
            } as React.ChangeEvent<HTMLInputElement>
            onChange?.(fakeEvent)
          }}
          {...rest}
        />
        <label className={classes.label}>{label}</label>
      </>
    )
  }
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
