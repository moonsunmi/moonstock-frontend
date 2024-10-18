interface Options {
  size?: Size
  type?: Type
  // variant?: Variant
  label?: string
}

export type CustomInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'size'
> &
  Options

type Type = 'number' | 'text' | 'password'
