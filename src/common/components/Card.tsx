import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type CardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement & { className: string }
>;

const Card = ({ className: _className, children, ...props }: CardProps) => {
  const className = ["bg-blue-100 p-4", _className].join(" ");
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Card;
