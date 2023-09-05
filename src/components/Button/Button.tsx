interface ButtonProps {
  className: string;
  actionOnClick: () => void;
  text: string;
}

const Button = ({
  className,
  actionOnClick,
  text,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type="button"
      className={`button ${className ? `${className}` : ""}`}
      onClick={actionOnClick}
    >
      {text}
    </button>
  );
};

export default Button;
