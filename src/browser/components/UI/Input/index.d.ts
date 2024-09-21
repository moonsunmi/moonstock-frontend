interface Options {
  size?: Size
  type?: Type
  // variant?: Variant
  label?: string
}

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Options

type Type = 'number' | 'text' | 'password'
