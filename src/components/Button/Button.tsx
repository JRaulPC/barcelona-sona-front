import React, { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  className: string;
  actionOnClick: () => void;
}

const Button = ({
  className,
  actionOnClick,
  children,
}: ButtonProps): React.ReactElement => {
  const buttonClass = `button ${className}`;

  return (
    <button type="button" className={buttonClass} onClick={actionOnClick}>
      {children}
    </button>
  );
};

export default Button;
