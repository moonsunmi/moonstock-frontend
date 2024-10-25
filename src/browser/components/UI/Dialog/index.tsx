// Components
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
// Styles
import classes from './index.module.scss'
// Types
import {DialogProps} from './index.d'

const Dialog = ({
  open,
  onClose,
  title,
  content,
  action,
  cancel,
  onAction,
  onCancel,
  ...props
}: DialogProps) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      classes={{paper: classes.dialog_paper}}
      {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && (
        <DialogContent classes={{root: classes.dialog_content}}>
          {typeof content === 'string' ? (
            <Typography variant="body2">{content}</Typography>
          ) : (
            content
          )}
        </DialogContent>
      )}
      {((action && onAction) || (cancel && onCancel)) && (
        <DialogActions classes={{root: classes.dialog_actions}}>
          {action && onAction && (
            <Button
              onClick={() => {
                onAction()
              }}>
              {action}
            </Button>
          )}
          {cancel && onCancel && (
            <Button
              onClick={() => {
                onCancel()
              }}>
              {cancel}
            </Button>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  )
}

export default Dialog
