import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

// CSR 환경에서는 잘되나 SSR 환경에서는 아래와 같이 변경해야 함
// import localStorage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/lib/storage/session";
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

// import accountSlice from './slices/accountSlice'
import authSlice from './slices/authSlice'
// import commonSlice from './slices/commonSlice'
// import managementSlice from './slices/managementSlice'
// import roadwaySlice from './slices/roadwaySlice'

// SSR 환경에서는 window
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    }
  }
}

const localStorage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()
const sessionStorage =
  typeof window !== 'undefined'
    ? createWebStorage('session')
    : createNoopStorage()

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
  blacklist: ['_persist']
}

export const store = configureStore({
  reducer: combineReducers({
    // account: accountSlice,
    auth: persistReducer(authPersistConfig, authSlice)
    // common: commonSlice,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false})
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
