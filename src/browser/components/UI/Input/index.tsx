'use client'

import {ChangeEvent, useState} from 'react'
// icons
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// styles
import styles from './index.module.scss'
import classNames from 'classnames'
// utils
import {formatNumber} from '@/common/utils'
// type
import {InputProps} from './index.d'

const Input = ({...props}: InputProps) => {
  const {
    className: _className,
    size = 'md',
    type = 'text',
    value = '',
    label = '',
    onChange,
    ...restProps
  } = props

  const containerClassName = classNames(styles.container, _className)
  const inputClassName = classNames(styles.input, styles[size], styles[type])

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [formattedNumber, setFormattedNumber] = useState<string>(
    formatNumber(value as string | number)
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '')

    if (type === 'number' && !isNaN(Number(rawValue))) {
      setFormattedNumber(formatNumber(Number(rawValue)))

      const newEvent = {
        ...e,
        target: {...e.target, value: rawValue}
      }
      onChange(newEvent as ChangeEvent<HTMLInputElement>)
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
        className={inputClassName}
        value={type === 'number' ? formattedNumber : value}
        type={getType()}
        onChange={handleChange}
        {...restProps}
      />
      <label className={styles.label}>{label}</label>
      {type === 'password' && (
        <div onClick={toggleVisible} className="absolute right-2">
          {isVisible ? <Visibility /> : <VisibilityOff />}
        </div>
      )}
    </div>
  )
}
export default Input
