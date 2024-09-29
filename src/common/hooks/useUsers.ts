import {useDispatch, useSelector} from '@/store/store'
import useApi from './useApi'

const useUsers = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.auth)
  const {execute: getHoldingsRequest, data, errMsg} = useApi()

  const getHoldings = async () => {
    await getHoldingsRequest({
      url: 'http://localhost:4000/users/holdings',
      method: 'GET',
      // data: formData,
      withCredentials: true // cookie 안에 있는 token을 위해
    })
  }
  return {getHoldings}
}

export default useUsers
