// https://dev.to/mhcrocky/creating-a-reusable-button-component-with-react-and-tailwind-css-4dh5

import {forwardRef} from 'react'
import classes from './index.module.scss'

type Ref = HTMLButtonElement
type Variant = 'text' | 'outlined' | 'solid' | 'ghost'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Options {
  /**
   * Button display variants
   * @default "solid"
   * @type Variant ('text' | 'outlined' | 'solid' | 'ghost')
   */
  variant?: Variant
  size?: Size
}

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Options

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = 'solid',
    size = 'md',
    children,
    className,
    ...restProps
  } = props

  const mergedClass = [
    classes.button,
    classes[variant],
    classes[size],
    className
  ].join(' ')

  return (
    <button ref={ref} className={mergedClass} {...restProps}>
      {children}
    </button>
  )
})
Button.displayName = 'Button'
export default Button
