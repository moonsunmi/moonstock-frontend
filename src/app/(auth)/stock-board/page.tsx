'use client'
// Components
import {useEffect} from 'react'
import {useSelector} from '@/store/store'

export default function StockBoardPage() {
  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    // getHoldings()
  }, [])

  return <></>
}
