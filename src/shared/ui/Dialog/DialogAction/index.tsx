import classNames from 'classnames'
import classes from './index.module.scss'
import {HTMLAttributes} from 'react'

interface DialogActionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const DialogAction = ({
  children,
  className = '',
  ...props
}: DialogActionProps) => {
  return (
    <div className={classNames(classes.action, className)} {...props}>
      {children}
    </div>
  )
}
export default DialogAction
