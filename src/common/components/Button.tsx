// https://dev.to/mhcrocky/creating-a-reusable-button-component-with-react-and-tailwind-css-4dh5

import { forwardRef } from "react";

interface ButtonOptions {
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

type ButtonVariant = "outlined" | "solid" | "ghost";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "outlined":
      // TODO.
      // .btn-outline {
      //     @apply border border-blue-300 bg-opacity-0 text-blue-500;
      //     &:hover,
      //     &:focus {
      //       @apply border bg-blue-500 bg-opacity-20;
      //     }
      //   }
      return undefined;
    case "ghost":
      //   .btn-ghost {
      //     @apply border border-transparent bg-opacity-0 text-gray-500;
      //     &:hover,
      //     &:focus {
      //       @apply border-gray-300;
      //     }
      //   }
      return undefined;
    default:
      return undefined;
  }
};

const getSize = (size: ButtonSize) => {
  switch (size) {
    case "xs":
      return "text-xs";
    case "sm":
      return "text-sm";
    case "md":
      return "text-base";
    case "lg":
      return "text-lg py-3 px-6";
    case "xl":
      return "text-xl py-3 px-6";
  }
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = "solid",
    size = "md",
    children,
    className,
    ...rest
  } = props;

  const merged = [
    "align-middle select-none font-sans font-bold text-center uppercase transition-all",
    "disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-gray-900/10",
    "hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
    getVariant(variant),
    getSize(size),
    className,
  ].join(" ");

  return (
    <button ref={ref} className={merged} {...rest}>
      {children}
    </button>
  );
});
Button.displayName = "Button";
export default Button;
