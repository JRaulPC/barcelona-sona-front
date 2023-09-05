import React from "react";

interface ButtonProps {
  className: string;
  actionOnClick: () => void;
  children: React.ReactElement;
}

const Button = ({
  className,
  actionOnClick,
  children,
}: ButtonProps): React.ReactElement => {
  const buttonClass = className ? `button ${className}` : "button";

  return (
    <button type="button" className={buttonClass} onClick={actionOnClick}>
      {children}
    </button>
  );
};

export default Button;
