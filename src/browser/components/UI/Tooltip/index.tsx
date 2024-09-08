import {useFloating, Placement} from '@floating-ui/react'
import styles from './index.module.scss'

type TooltipProps = {
  placement?: Placement
}

const Tooltip = ({placement = 'top'}: TooltipProps) => {
  const {refs, context} = useFloating({placement: placement})

  return <div className={styles.container}>hi</div>
}
export default Tooltip
