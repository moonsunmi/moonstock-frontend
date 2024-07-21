import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = ({ ...props }: InputProps) => {
  return <input {...props} />;
};

export default Input;
