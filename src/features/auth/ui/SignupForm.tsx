'use client'

import {Button, Card, Input, Paragraph} from '@/shared/ui'
import useSignup from '../hooks/useSignup'

const SignupForm = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    handleOnChange,
    createAccount
  } = useSignup()

  return (
    <div className="flex items-center justify-center w-full px-56">
      <Card>
        <div className="mb-4 text-center">
          <Paragraph variant="title">SignUp</Paragraph>
        </div>
        <hr className="h-1 pt-2 pb-2 border-secondary-300" />
        <div className="flex flex-col gap-6">
          <Input
            type="text"
            className="w-full"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleOnChange('name')}
          />
          <Input
            type="text"
            className="w-full"
            name="email"
            placeholder="Email"
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
          <Input
            type="password"
            className="w-full"
            name="confirm_password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleOnChange('confirmPassword')}
          />
          <hr className="h-1 pt-2 pb-2 border-secondary-300" />
          <Button type="submit" className="w-full" onClick={createAccount}>
            계정 만들기
          </Button>
        </div>
      </Card>
    </div>
  )
}
export default SignupForm
