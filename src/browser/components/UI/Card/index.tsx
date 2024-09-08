import {DetailedHTMLProps, HTMLAttributes} from 'react'
import styles from './index.module.scss'

type CardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement & {className: string}
>

const Card = ({className: _className, children, ...props}: CardProps) => {
  const className = [styles.container, _className].join(' ')
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
export default Card
