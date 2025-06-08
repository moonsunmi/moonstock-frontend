'use client'

import {forwardRef, Ref} from 'react'
import classNames from 'classnames'
import classes from './index.module.scss'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  customSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Radio = forwardRef(
  (
    {label, customSize = 'md', className = '', ...props}: RadioProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const wrapperClass = classNames(classes.wrapper, className)
    const radioClass = classNames(classes.radio, classes[customSize])

    return (
      <label className={wrapperClass}>
        <input ref={ref} type="radio" className={radioClass} {...props} />
        <span className={classes.fakeRadio} />
        <span className={classes.labelText}>{label}</span>
      </label>
    )
  }
)

Radio.displayName = 'Radio'
export default Radio
