import {createSlice} from '@reduxjs/toolkit'

export interface IUserType {
  name: string | null
  email: string | null
}

interface StateType {
  userInfo: IUserType
  jwtToken: string
}

const initialState: StateType = {
  userInfo: {
    name: null,
    email: null
  },
  jwtToken: null
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
    },
    setJwtToken: (state, action) => {
      return {
        ...state,
        jwtToken: action.payload
      }
    }
  }
})

export const {setUserInfo, setJwtToken} = authSlice.actions
export default authSlice.reducer
