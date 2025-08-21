import classes from './index.module.scss'

interface Options {
  variant?: Variant
  color?: Color
}

type Variant = 'header' | 'title' | 'subtitle' | 'body' | 'body2' | 'caption'
type Color = 'primary' | 'secondary' | 'black'

export type ParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> &
  Options

const Paragraph = ({...props}: ParagraphProps) => {
  const {
    variant = 'body',
    color = 'secondary',
    className: _className,
    children,
    ...restProps
  } = props
  const className = [classes[color], classes[variant], _className].join(' ')
  return (
    <p className={className} {...restProps}>
      {children}
    </p>
  )
}

export default Paragraph
