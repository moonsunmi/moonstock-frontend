import classNames from 'classnames'
import Card from '../../Card'
import classes from './index.module.scss'
import {HTMLAttributes} from 'react'

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  className?: string
}

const Dialog = ({
  open,
  onClose,
  children,
  className = '',
  ...props
}: DialogProps) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <Card
        variant="dialog"
        className={classNames(classes.container, className)}
        onClick={e => {
          e.stopPropagation()
        }}
        {...props}>
        {children}
      </Card>
    </div>
  )
}
export default Dialog
