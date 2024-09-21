import styles from './index.module.scss'

interface Options {
  type?: Type
  color?: Color
}

type Type = 'title' | 'subtitle' | 'body' | 'body2' | 'caption'
type Color = 'primary' | 'secondary' | 'black'

export type ParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> &
  Options

const Paragraph = ({...props}: ParagraphProps) => {
  const {
    type = 'body',
    color = 'secondary',
    className: _className,
    children,
    ...restProps
  } = props
  const className = [styles[color], styles[type], _className].join(' ')
  return (
    <p className={className} {...restProps}>
      {children}
    </p>
  )
}

export default Paragraph
