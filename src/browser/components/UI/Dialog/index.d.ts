import {Dispatch, ReactNode, SetStateAction} from 'react'
import {DialogProps as MuiDialogProps} from '@mui/material'

export interface DialogProps extends MuiDialogProps {
  open: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  title?: string
  content?: string | ReactNode
  action?: string
  cancel?: string
  onAction?: Function
  onCancel?: Function
}
