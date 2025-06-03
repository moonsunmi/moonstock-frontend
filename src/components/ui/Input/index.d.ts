type InputPropsBase = {
  type?: 'text' | 'password' | 'number'
  size?: 'md'
  label?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export type TextInputProps = InputPropsBase & {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type PasswordInputProps = InputPropsBase & {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type NumberInputProps = InputPropsBase & {
  value: number | ''
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type CustomInputProps =
  | TextInputProps
  | PasswordInputProps
  | NumberInputProps
