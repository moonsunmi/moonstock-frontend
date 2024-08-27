import React from 'react'

interface Options {
  size?: Size
}

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Options

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const getSizeStyle = (size: Size) => {
  switch (size) {
    case 'xs':
      return 'text-xs py-1 px-1'
    case 'sm':
      return 'text-sm py-1.5 px-1.5'
    case 'md':
      return 'text-base py-2 px-2'
    case 'lg':
      return 'text-lg py-3 px-3'
    case 'xl':
      return 'text-xl py-4 px-4'
    default:
      return ''
  }
}

const TextField = ({...props}: InputProps) => {
  const {className, size = 'md', ...restProps} = props
  const defaultStyle = [
    'border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 hover:opacity-[0.98]',
    'focus:outline-none focus:ring-0 focus:shadow-none'
  ].join(' ')
  const mergedClass = [defaultStyle, getSizeStyle(size), className].join(' ')

  return <input className={mergedClass} {...restProps} />
}

export default TextField
