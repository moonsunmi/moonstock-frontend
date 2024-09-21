'use client'
import {useFloating, Placement} from '@floating-ui/react'
import styles from './index.module.scss'

type TooltipProps = {
  placement?: Placement
  className: string
}

const Tooltip = ({...props}: TooltipProps) => {
  const {placement = 'top', className: _className, ...restProps} = props
  const {refs, context} = useFloating({placement: placement})

  const className = [styles.tooltip, _className].join(' ')
  return (
    <div className={className} {...restProps}>
      hi
    </div>
  )
}
export default Tooltip
