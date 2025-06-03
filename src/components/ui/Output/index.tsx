'use client'

import {ReactNode} from 'react'
// style
import classes from './index.module.scss'
// type
import {OutputProps} from '.'
// utils
import {formatNumber} from '@/utils'

const Output = ({...props}: OutputProps) => {
  const {
    className: _className,
    size = 'md',
    type = 'string',
    label = '',
    children,
    ...restProps
  } = props

  const className = [
    classes.output,
    classes[size],
    classes[type],
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
    <div className={classes.container}>
      <output className={className} {...restProps}>
        {formattedValue(children)}
      </output>
      <label className={classes.label}>{label}</label>
    </div>
  )
}
export default Output
