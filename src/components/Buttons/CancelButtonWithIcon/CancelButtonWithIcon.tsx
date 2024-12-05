import { ReactNode } from "react";
import IconOrchestrator from "@/components/Icons/IconOrchestrator/IconOrchestrator";
import { IconEnum } from "@/constants/iconEnum";

type CancelButtonProps = {
  text?: string;
  onClick?: VoidFunction;
  icon?: IconEnum;
  prefix?: ReactNode;
  disabled?: boolean;
};

function CancelButtonWithIcon({
  text,
  onClick,
  icon,
  prefix,
  disabled = false,
}: CancelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        disabled
          ? "opacity-40 cursor-not-allowed hover:!text-inherit pointer-events-none"
          : "bg-red-800 hover:bg-red-900 text-white"
      } font-bold p-1 pl-2 rounded-lg w-full flex justify-between items-center group ease-in-out duration-300`}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        {prefix && prefix}
        {text}
      </div>
      {icon && (
        <span className="bg-white-10 backdrop-blur-md font-bold p-2 rounded-lg flex items-center justify-center w-10 h-10 ease-in-out duration-300">
          {<IconOrchestrator type={icon} />}
        </span>
      )}
    </button>
  );
}

export default CancelButtonWithIcon;
