'use client'

import {ChangeEvent, useState} from 'react'
import {formatNumber} from '@/common/utils'
import styles from './index.module.scss'

interface Options {
  size?: Size
  type?: Type
}

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Options

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Type = 'number' | 'string'

const Input = ({...props}: InputProps) => {
  const {
    className,
    size = 'md',
    type = 'string',
    value = '',
    onChange,
    ...restProps
  } = props

  const mergedClass = [
    styles.container,
    styles[size],
    styles[type],
    className
  ].join(' ')

  const [formattedValue, setFormattedValue] = useState<string>(
    formatNumber(value as string | number)
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '')

    if (type === 'number' && !isNaN(Number(rawValue))) {
      setFormattedValue(formatNumber(Number(rawValue)))

      const newEvent = {
        ...e,
        target: {...e.target, value: rawValue}
      }
      onChange(newEvent as ChangeEvent<HTMLInputElement>)
    } else {
      onChange(e)
    }
  }

  return (
    <input
      className={mergedClass}
      value={formattedValue}
      onChange={handleChange}
      {...restProps}
    />
  )
}
export default Input
