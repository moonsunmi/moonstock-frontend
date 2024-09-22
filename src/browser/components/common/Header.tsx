'use client'

import {useRouter} from 'next/navigation'
// Components
import {Button} from '../UI'
import {useSelector} from '@/store/store'
import {useEffect, useState} from 'react'

export const Header = () => {
  const router = useRouter()
  const {userInfo} = useSelector(state => state.auth)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="fixed flex flex-row content-center justify-between w-full h-16 p-5 font-bold shadow-md text-primary-950 bg-secondary-200">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        MoonStock
      </div>
      <div className="flex gap-1">
        <Button variant="text">Components</Button>
        <Button variant="text" onClick={() => router.push('/login')}>
          {isMounted ? (userInfo?.id === null ? 'LogIn' : 'LogOut') : 'LogIn'}
        </Button>
      </div>
    </div>
  )
}
