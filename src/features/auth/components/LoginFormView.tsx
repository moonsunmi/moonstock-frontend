'use client'

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Input,
  Paragraph
} from '@/components/ui'
import useLogin from '../hooks/useLogin'

const LoginFormView = () => {
  const {
    email,
    password,
    isSubmitting,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    goSignUp
  } = useLogin()

  const disabled = isSubmitting || !email.trim() || !password.trim()

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
              onChange={onChangeEmail}
            />
            <Input
              type="password"
              className="w-full"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={disabled}
              onClick={onSubmit}>
              LOGIN
            </Button>
            <hr className="h-1 pt-2 pb-2 border-secondary-300" />
            <Button variant="outlined" onClick={goSignUp}>
              SignUp
            </Button>
          </div>
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
export default LoginFormView
