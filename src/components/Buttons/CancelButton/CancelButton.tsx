type ButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  styles?: string;
  disabled?: boolean;
  error?: boolean;
};

function CancelButton({
  text,
  onClick,
  styles,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className=" bg-red-800 hover:bg-red-900 px-6 py-3 text-grey-lightest font-bold text-base rounded-md ease-in-out duration-300 backdrop-blur-md"
    >
      {text}
    </button>
  );
}

export default CancelButton;
