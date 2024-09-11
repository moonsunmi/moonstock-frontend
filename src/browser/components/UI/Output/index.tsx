'use client'

import {ChangeEvent, ReactNode, useState} from 'react'
import {formatNumber} from '@/common/utils'

import styles from './index.module.scss'

interface Options {
  size?: Size
  type?: Type
}

type OutputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLOutputElement>,
  HTMLOutputElement
> &
  Options

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Type = 'number' | 'string'

const Output = ({...props}: OutputProps) => {
  const {
    className: _className,
    size = 'md',
    type = 'string',
    children,
    ...restProps
  } = props

  const className = [
    styles.container,
    styles[size],
    styles[type],
    _className
  ].join(' ')

  const formattedValue = (children: ReactNode) => {
    if (type === 'number') {
      if (typeof children === 'number' || typeof children === 'string')
        return formatNumber(children)
    }
    return children
  }

  return (
    <output className={className} {...restProps}>
      {formattedValue(children)}
    </output>
  )
}
export default Output
