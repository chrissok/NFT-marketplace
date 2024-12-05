type ButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  styles?: string;
  disabled?: boolean;
  error?: boolean;
};

function SubmitButton({
  text,
  onClick,
  styles,
  disabled,
  error = false,
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 text-grey-lightest font-bold text-base rounded-md ease-in-out duration-300 backdrop-blur-md";
  const normalClasses = "bg-green-main hover:bg-green-dark";
  const errorClasses = "bg-red-600 hover:!bg-red-600 !cursor-not-allowed";

  return (
    <button
      onClick={disabled || error ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        error ? errorClasses : normalClasses
      } ${disabled && "hover:bg-green-main"} ${styles}`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
