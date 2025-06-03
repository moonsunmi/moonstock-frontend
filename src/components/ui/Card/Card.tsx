import classNames from 'classnames'
import classes from './Card.module.scss'

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  variant?: 'default' | 'stock' | 'dialog'
  size?: 'sm' | 'md' | 'lg'
}

const getSizeByVariant = (variant: CardProps['variant']) => {
  switch (variant) {
    case 'dialog':
      return 'lg'
    case 'stock':
      return 'sm'
    default:
      return 'md'
  }
}

const Card = ({
  className,
  children,
  variant = 'default',
  size = 'md',
  ...restProps
}: CardProps) => {
  const resolvedSize = variant ? getSizeByVariant(variant) : size

  const composedClassName = classNames(
    classes.card,
    // classes[`variant-${variant}`],
    classes[`size-${resolvedSize}`],
    className
  )

  return (
    <div className={composedClassName} {...restProps}>
      {children}
    </div>
  )
}

export default Card
