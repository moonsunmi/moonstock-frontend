'use client'

import {useCallback, useContext, useState} from 'react'

import Button from '@/browser/components/UI/Button'
import {AuthContext} from '@/common/context'
import {Modal} from '@mui/material'
import {useRouter} from 'next/navigation'

export default function Logout() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const {logout} = useContext(AuthContext)
  const onAccept = useCallback(() => {
    logout(() => {
      setOpen(false)
      router.push('/')
    })
  }, [logout, router, setOpen])
  const onCancel = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Modal open={open} onClose={onCancel}>
      <>
        <p className="text-xl text-center">Are you sure you want to log out?</p>
        <Button className="btn-primary btn-sm" onClick={onAccept}>
          LOGOUT
        </Button>
        <Button className="btn-secondary btn-sm" onClick={onCancel}>
          CANCEL
        </Button>
      </>
    </Modal>
  )
}
