import classNames from 'classnames'
import styles from './index.module.scss'
import {HTMLAttributes} from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface DialogTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  onClose?: () => void
}
const DialogTitle = ({
  children,
  className = '',
  onClose,
  ...props
}: DialogTitleProps) => {
  return (
    <div className={classNames(styles.title, className)} {...props}>
      <span>{children}</span>
      {onClose && (
        <button className={styles.close} onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
export default DialogTitle
