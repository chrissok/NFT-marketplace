import IconOrchestrator from "@/components/Icons/IconOrchestrator/IconOrchestrator";
import { IconEnum } from "@/constants/iconEnum";

type ButtonProps = {
  icon?: IconEnum;
  onClick?: VoidFunction;
  variant?: "STANDARD" | "BIG" | "MEDIUM";
  styles?: string | undefined;
  disableHover?: boolean;
  id?: string;
};

const variants = {
  BIG: "w-16 h-16",
  MEDIUM: "w-10 h-10",
  STANDARD: "w-8 h-8",
};

function ButtonIcon({
  icon = IconEnum.ArrowRightBig,
  onClick,
  disableHover = false,
  styles,
  variant = "STANDARD",
  id,
}: ButtonProps) {
  const hoverStyles = () =>
    disableHover
      ? "cursor-default"
      : "hover:bg-button-secondary-color-hover cursor-pointer";

  return (
    <button
      onClick={onClick}
      id={id ? id : ""}
      className={`${variants[variant]} text-white font-bold p-2 rounded-lg bg-button-secondary-color ${hoverStyles()} flex items-center justify-center ease-in-out duration-300 ${styles}`}
    >
      {<IconOrchestrator type={icon} />}
    </button>
  );
}

export default ButtonIcon;
