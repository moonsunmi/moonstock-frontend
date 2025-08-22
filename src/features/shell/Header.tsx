'use client'

import Button from '@/shared/ui/Button'
import useHeader from './useHeader'

const Header = () => {
  const {isAuthed, logout, go} = useHeader()

  return (
    <div className="box-border fixed z-50 flex flex-row content-center justify-between w-full h-16 p-5 font-bold border shadow-md text-primary-950 bg-primary-200">
      <div className="cursor-pointer" onClick={() => go('/')}>
        MoonStock
      </div>
      <div className="flex gap-1">
        <Button variant="text" onClick={() => go('/board')}>
          내 주식
        </Button>
        {isAuthed ? (
          <Button variant="text" onClick={logout}>
            LogOut
          </Button>
        ) : (
          <Button variant="text" onClick={() => go('/login')}>
            LogIn
          </Button>
        )}
      </div>
    </div>
  )
}
export default Header
