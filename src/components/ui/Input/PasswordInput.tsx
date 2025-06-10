import React, {useState, forwardRef} from 'react'
import classNames from 'classnames'
import classes from './index.module.scss'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {PasswordInputProps} from './index.d'

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      value = '',
      label = '',
      type,
      onChange,
      ...rest
    } = props
    const [isVisible, setIsVisible] = useState(false)

    const inputClassName = classNames(classes.input, classes[size])

    return (
      <>
        <input
          ref={ref}
          className={inputClassName}
          value={value}
          type={isVisible ? 'text' : 'password'}
          onChange={onChange}
          {...rest}
        />
        <label className={classes.label}>{label}</label>
        <div
          onClick={() => setIsVisible(prev => !prev)}
          className="absolute cursor-pointer right-2">
          {isVisible ? <Visibility /> : <VisibilityOff />}
        </div>
      </>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
