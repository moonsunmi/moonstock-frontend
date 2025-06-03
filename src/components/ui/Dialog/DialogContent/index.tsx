import classNames from 'classnames'
import {HTMLAttributes} from 'react'

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const DialogContent = ({
  children,
  className = '',
  ...props
}: DialogContentProps) => {
  return (
    <div className={classNames('', className)} {...props}>
      {children}
    </div>
  )
}
export default DialogContent
