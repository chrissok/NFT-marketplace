type ButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  variant?: "PRIMARY" | "SMALL" | "SUBMIT" | "WHITE";
  styles?: string | undefined;
};

const variants = {
  PRIMARY:
    "bg-white-10 border border-white-10 px-5 py-2 hover:bg-grey-lightest backdrop-blur-sm hover:text-black-main",
  WHITE:
    "hover:bg-white-10 border border-white-10 px-5 py-2 bg-grey-lightest backdrop-blur-sm !text-black-main hover:!text-grey-lightest text-xl",
  SMALL: "bg-white-6 hover:bg-white-10 px-4 py-2",
  SUBMIT: "bg-green-main hover:bg-green-dark py-2 px-7",
};

function SecondaryButton({
  text,
  onClick,
  variant = "PRIMARY",
  styles,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} text-grey-lightest font-normal rounded-md font-body ${styles} ease-in-out duration-300`}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
