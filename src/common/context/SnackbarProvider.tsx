'use client'

import {SnackbarProvider as Provider} from 'notistack'
const SnackbarProvider = ({children}) => {
  return <Provider maxSnack={3}>{children}</Provider>
}
export default SnackbarProvider
