// https://dev.to/mhcrocky/creating-a-reusable-button-component-with-react-and-tailwind-css-4dh5

import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./index.module.scss";

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
      return styles["btn-outline"];
    case "ghost":
      return styles["btn-ghost"];
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

  const merged = clsx(
    styles["btn"],
    getVariant(variant),
    getSize(size),
    className
  );

  console.log(merged);

  return (
    <button ref={ref} className={merged} {...rest}>
      {children}
    </button>
  );
});
Button.displayName = "Button";
export default Button;
