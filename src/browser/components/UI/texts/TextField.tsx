import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const TextField = ({...props}: InputProps) => {
  const {className, ...restProps} = props
  const defaultStyle = ['border border-gray300 rounded-md']
  const mergedClass = [[...defaultStyle], className].join(' ')
  return <input className={mergedClass} {...restProps} />
}

export default TextField
