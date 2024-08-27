// https://dev.to/mhcrocky/creating-a-reusable-button-component-with-react-and-tailwind-css-4dh5

import {forwardRef} from 'react'

type Ref = HTMLButtonElement
type Variant = 'outlined' | 'solid' | 'ghost'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Options {
  /**
   * Button display variants
   * @default "solid"
   * @type Variant
   */
  variant?: Variant
  size?: Size
}

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Options

const getVariant = (variant: Variant) => {
  switch (variant) {
    case 'solid':
      return 'text-white bg-blue-500 hover:opacity-[0.9] focus:opacity-[0.8]'
    case 'outlined':
      return 'border border-blue-300 bg-opacity-0 text-blue-500 hover:bg-gray-100 focus:bg-gray-200'
    // TODO.
    // .btn-outline {
    //     @apply border border-blue-300 bg-opacity-0 text-blue-500; // done.
    //     &:hover,
    //     &:focus {
    //       @apply border bg-blue-500 bg-opacity-20;
    //     }
    //   }
    case 'ghost':
      //   .btn-ghost {
      //     @apply border border-transparent bg-opacity-0 text-gray-500;
      //     &:hover,
      //     &:focus {
      //       @apply border-gray-300;
      //     }
      //   }
      return ''
    default:
      return ''
  }
}

const getSizeStyle = (size: Size) => {
  switch (size) {
    case 'xs':
      return 'text-xs py-1 px-1'
    case 'sm':
      return 'text-sm py-2 px-2'
    case 'md':
      return 'text-base py-3 px-3'
    case 'lg':
      return 'text-lg py-4 px-4'
    case 'xl':
      return 'text-xl py-5 px-5'
    default:
      return ''
  }
}

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = 'solid',
    size = 'md',
    children,
    className,
    ...restProps
  } = props

  const defaultStyle = [
    'align-middle select-none font-sans font-bold text-center uppercase transition-all',
    'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg shadow-md shadow-gray-900/10',
    'hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
  ].join(' ')

  const mergedClass = [
    defaultStyle,
    getVariant(variant),
    getSizeStyle(size),
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
