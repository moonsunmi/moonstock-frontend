import classes from './index.module.scss'

type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement & {className: string}
>

const Card = ({...props}: CardProps) => {
  const {className: _className, children, ...restProps} = props
  const className = [classes.card, _className].join(' ')

  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  )
}
export default Card
