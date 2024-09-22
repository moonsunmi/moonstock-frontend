import {createSlice} from '@reduxjs/toolkit'

export interface IUserType {
  name: string | null
  email: string | null
}

interface StateType {
  userInfo: IUserType
}

const initialState: StateType = {
  userInfo: {
    name: null,
    email: null
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
