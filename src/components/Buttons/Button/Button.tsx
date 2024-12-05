type ButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  variant?: "PRIMARY" | "SMALL" | "SUBMIT";
  styles?: string | undefined;
  disabled?: boolean;
};

const variants = {
  PRIMARY:
    "bg-white-3 border border-white-20 py-1 px-10 h-12 hover:bg-white-10 backdrop-blur-2xl",
  SMALL: "bg-white-6 hover:bg-white-10 px-4 py-2",
  SUBMIT: "bg-green-main hover:bg-green-dark py-2 px-7",
};

function Button({
  text,
  onClick,
  variant = "PRIMARY",
  styles,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} text-white font-bold rounded-md ${styles} ease-in-out duration-300`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
