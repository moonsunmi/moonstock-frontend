'use client'

import {ChangeEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import {useSnackbar} from 'notistack'
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Input,
  Paragraph
} from '@/components/ui'
import axiosInstance from '@/lib/axios'
import {writeItemFromStorage} from '@/utils'
import {useUserStore} from '@/stores/useUserStore'
import {useAccountStore} from '@/stores/useAccountStore'

type LoginArg = {email: string; password: string}
type FormType = Record<'email' | 'password', string>

const LoginPage = () => {
  const router = useRouter()
  const {enqueueSnackbar} = useSnackbar()

  const {setUserInfo} = useUserStore()
  const {setAccounts} = useAccountStore()
  const [{email, password}, setForm] = useState<FormType>({
    email: '',
    password: ''
  })
  const [open, setOpen] = useState(false)

  const {isMutating, trigger} = useSWRMutation(
    '/api/auth/login',
    (url, {arg}: {arg: LoginArg}) => {
      return axiosInstance
        .post(url, arg, {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        })
        .then(res => res.data)
    },
    {
      onSuccess: res => {
        const {userInfo, accessToken} = res

        setUserInfo({
          ...userInfo,
          defaultAccount: userInfo.accounts.find(account => account.isDefault)
        })
        setAccounts(userInfo.accounts)
        writeItemFromStorage('accessToken', accessToken)

        router.push('/board')
        enqueueSnackbar(`로그인되었습니다.`, {variant: 'success'})
      },
      onError: (e: any) => {
        enqueueSnackbar(
          `로그인 에러:${e?.response?.data?.errorMessage ?? '알 수 없는 에러'}`,
          {variant: 'error'}
        )
      }
    }
  )

  const handleOnChange =
    (key: 'email' | 'password') => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(prevObj => ({...prevObj, [key]: e.target.value}))
    }

  const handleOnClick_Login = () => {
    trigger({email, password})
  }

  return (
    <>
      <div className="flex items-start w-full px-4">
        <Card>
          <div className="mb-4 text-center">
            <Paragraph variant="title">Login</Paragraph>
          </div>
          <hr className="h-1 pt-2 pb-2 border-secondary-300" />
          <div className="flex flex-col gap-6">
            <Input
              name="email"
              className="w-full"
              placeholder="이메일"
              value={email}
              onChange={handleOnChange('email')}
            />
            <Input
              type="password"
              className="w-full"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={handleOnChange('password')}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isMutating}
              onClick={handleOnClick_Login}>
              LOGIN
            </Button>
            <hr className="h-1 pt-2 pb-2 border-secondary-300" />
            <Button variant="outlined" onClick={() => router.push('/sign-up')}>
              SignUp
            </Button>
          </div>
        </Card>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <div>무료 플랜 사용으로 로그인에 다소 시간이 걸릴 수 있습니다.</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default LoginPage
