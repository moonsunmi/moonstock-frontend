'use client'
// Components
import {useEffect} from 'react'
import useUsers from '@/common/hooks/useUsers'
import {useSelector} from '@/store/store'

export default function StockBoardPage() {
  const {userInfo} = useSelector(state => state.auth)
  const {getHoldings} = useUsers()

  useEffect(() => {
    getHoldings()
  }, [])

  return <></>
}
