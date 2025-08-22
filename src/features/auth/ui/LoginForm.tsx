'use client'

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Input,
  Paragraph
} from '@/shared/ui'
import useLogin from '../hooks/useLogin'
import Link from 'next/link'

const LoginForm = () => {
  const {email, password, isSubmitting, onChange, onSubmit} = useLogin()

  const disabled = isSubmitting || !email.trim() || !password.trim()

  return (
    <>
      <div className="flex items-start w-full px-4">
        <Card>
          <div className="mb-4 text-center">
            <Paragraph variant="title">Login</Paragraph>
          </div>

          <form onSubmit={onSubmit} noValidate aria-busy={isSubmitting}>
            <hr className="h-1 pt-2 pb-2 border-secondary-300" />
            <div className="flex flex-col gap-6">
              <label htmlFor="email-input" className="sr-only">
                이메일
              </label>
              <Input
                id="email-input"
                name="email"
                className="w-full"
                placeholder="email@example.com"
                value={email}
                onChange={onChange}
              />

              <label htmlFor="password-input" className="sr-only">
                비밀번호
              </label>
              <Input
                id="password-input"
                type="password"
                className="w-full"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={onChange}
              />

              <Button type="submit" className="w-full" disabled={disabled}>
                LOGIN
              </Button>

              <hr className="h-1 pt-2 pb-2 border-secondary-300" />

              <Button variant="outlined">
                <Link href="/sign-up">SignUp</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <Dialog open={isSubmitting} onClose={() => {}}>
        <DialogContent>
          <div>무료 플랜 사용으로 로그인에 다소 시간이 걸릴 수 있습니다.</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default LoginForm
