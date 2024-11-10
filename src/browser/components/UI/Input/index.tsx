'use client'

import {ChangeEvent, forwardRef, Ref, useState} from 'react'
// icons
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// styles
import classes from './index.module.scss'
import classNames from 'classnames'
// utils
import {formatNumber} from '@/common/utils'
// type
import {CustomInputProps} from './index.d'

const Input = forwardRef(
  (
    props: CustomInputProps & {
      inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const {
      className: _className,
      size = 'md',
      type = 'text',
      value = '',
      label = '',
      onChange,
      inputProps, // 새로 추가
      ...restProps
    } = props

    const containerClassName = classNames(classes.container, _className)
    const inputClassName = classNames(
      classes.input,
      classes[size],
      classes[type]
    )

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [formattedNumber, setFormattedNumber] = useState<string>(
      formatNumber(value as string | number)
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (type === 'number') {
        const rawValue = e.target.value.replace(/,/g, '')

        if (!isNaN(Number(rawValue))) {
          setFormattedNumber(formatNumber(Number(rawValue)))
          e.target.value = rawValue

          onChange(e)
        }
      } else {
        onChange(e)
      }
    }

    const toggleVisible = () => {
      setIsVisible(prev => !prev)
    }

    const getType = () => {
      if (type === 'number') return 'text'
      if (type === 'password') {
        if (isVisible) return 'text'
      }
      return type
    }

    return (
      <div className={containerClassName}>
        <input
          ref={ref}
          className={inputClassName}
          value={type === 'number' ? formattedNumber : value}
          type={getType()}
          onChange={handleChange}
          {...inputProps}
          {...restProps}
        />
        <label className={classes.label}>{label}</label>
        {type === 'password' && (
          <div onClick={toggleVisible} className="absolute right-2">
            {isVisible ? <Visibility /> : <VisibilityOff />}
          </div>
        )}
      </div>
    )
  }
)
export default Input
