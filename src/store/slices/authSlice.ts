import {createSlice} from '@reduxjs/toolkit'

export interface IUserType {
  id: string
  name: string
  email: string
}

interface StateType {
  userInfo: IUserType
}

const initialState: StateType = {
  userInfo: {
    id: null,
    name: '',
    email: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: action.payload
      }
    }
  }
})

export const {setUserInfo} = authSlice.actions
export default authSlice.reducer
