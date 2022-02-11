import React from "react";

export type Props = {
  className?: string;
}

const Button: React.FC<Props> = ({ className }) => {
  return <div className={className}>This is button!</div>;
};

export default Button;
