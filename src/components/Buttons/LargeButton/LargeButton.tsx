import { IconEnum } from "@/constants/iconEnum";
import IconOrchestrator from "@/components/Icons/IconOrchestrator/IconOrchestrator";
import { ReactNode } from "react";

type LargeButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  variant?: "PRIMARY" | "SECONDARY" | "SUBMIT";
  styles?: string | undefined;
  icon?: IconEnum;
  prefix?: ReactNode;
  disabled?: boolean;
};

const variants = {
  PRIMARY: "bg-grey-lightest hover:text-blue-main text-black-main",
  SECONDARY:
    "bg-white-3 hover:bg-white-6 text-grey-lightest hover:text-blue-main border-dark-gray border-white-20",
  SUBMIT: "bg-blue-main hover:bg-blue-light text-grey-lightest ",
};

const iconVariants = {
  PRIMARY: "bg-black-main group-hover:bg-blue-main",
  SECONDARY:
    "bg-button-secondary-color group-hover:bg-blue-main group-hover:backdrop-blur-md",
  SUBMIT: "bg-white-10 backdrop-blur-md",
};

const disabledStyle =
  "opacity-40 cursor-not-allowed hover:!text-inherit pointer-events-none";

function LargeButton({
  text,
  onClick,
  variant = "PRIMARY",
  styles,
  icon = IconEnum.ArrowRightBig,
  prefix,
  disabled = false,
}: LargeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${disabled && disabledStyle} font-bold p-1 pl-2 rounded-lg w-full flex justify-between items-center border ${styles} group ease-in-out duration-300`}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        {prefix && prefix}
        {text}
      </div>
      {icon && (
        <span
          className={`${iconVariants[variant]} font-bold p-2 rounded-lg flex items-center justify-center w-10 h-10 ease-in-out duration-300`}
        >
          {<IconOrchestrator type={icon} />}
        </span>
      )}
    </button>
  );
}

export default LargeButton;
