'use client'

import {ReactNode} from 'react'
// style
import styles from './index.module.scss'
// type
import {OutputProps} from './index.d'
// utils
import {formatNumber} from '@/common/utils'

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
    styles.output,
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
    <div className={styles.container}>
      <output className={className} {...restProps}>
        {formattedValue(children)}
      </output>
      <label className={styles.label}>{label}</label>
    </div>
  )
}
export default Output
