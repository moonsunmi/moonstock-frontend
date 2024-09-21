interface Options {
  size?: Size
  type?: Type
  label?: string
}

export type OutputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLOutputElement>,
  HTMLOutputElement
> &
  Options

type Type = 'number' | 'string'
