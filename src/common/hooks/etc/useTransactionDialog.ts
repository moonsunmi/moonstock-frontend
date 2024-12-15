import {useReducer, useState} from 'react'

const ActionTypes = {
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  OPEN_DIALOG: 'OPEN_DIALOG',
  CREATE_TRANSACTION: 'CREATE_TRANSACTION',
  LINK_TRANSACTION: 'LINK_TRANSACTION'
} as const

interface State {
  dialogOpen: boolean
  selectedTransaction: ITransaction | null
}

type Action =
  | {type: typeof ActionTypes.CLOSE_DIALOG}
  | {type: typeof ActionTypes.OPEN_DIALOG}
  | {type: typeof ActionTypes.CREATE_TRANSACTION}
  | {type: typeof ActionTypes.LINK_TRANSACTION; payload: ITransaction}

const initState: State = {
  dialogOpen: false,
  selectedTransaction: null
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.CREATE_TRANSACTION:
      return {...state, dialogOpen: true, selectedTransaction: null}
    case ActionTypes.LINK_TRANSACTION:
      return {...state, dialogOpen: true, selectedTransaction: action.payload}
    case ActionTypes.CLOSE_DIALOG:
      return {...state, dialogOpen: false, selectedTransaction: null}
    default:
      throw new Error('Unknown action type')
  }
}

const useTransactionDialog = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const handleCreateTransact = () => {
    dispatch({type: ActionTypes.CREATE_TRANSACTION})
  }
  const handleLinkTransact = (transaction: ITransaction) => {
    dispatch({type: ActionTypes.LINK_TRANSACTION, payload: transaction})
  }
  const handleCloseDialog = () => {
    dispatch({type: ActionTypes.CLOSE_DIALOG})
  }

  return {state, handleCreateTransact, handleLinkTransact, handleCloseDialog}
}

export default useTransactionDialog
