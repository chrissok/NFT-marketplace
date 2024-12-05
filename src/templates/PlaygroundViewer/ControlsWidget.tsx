"use client";
import ShiftSvg from "./ShiftSvg";
import SpaceSvg from "./SpaceSvg";
import WASDsvg from "./WASDsvg";

function ControlsWidget({ handleClose }: { handleClose: VoidFunction }) {
  return (
    <div
      className={`flex flex-col w-[292px] bg-blur-dark-50 backdrop-blur-2xl h-[220px] rounded-2xl p-4 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex justify-between font-body font-semibold text-grey-lightest mb-4">
        <p>Controls</p>
        <div
          className="rounded-full bg-blur-dark-3 py-1 px-3 cursor-pointer flex items-center justify-center"
          onClick={handleClose}
        >
          X
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center">
        <div className="flex flex-col px-[6px] py-[10px] justify-center w-[84px] items-center rounded-xl bg-blur-dark-3">
          <WASDsvg />
          <p className="text-grey-normal text-xs">Use WASD to move around</p>
        </div>
        <div className="flex flex-col px-[6px] py-[10px] justify-center w-[84px] items-center rounded-xl bg-blur-dark-3">
          <ShiftSvg />
          <p className="text-grey-normal text-xs">Use SHIFT to run</p>
        </div>
        <div className="flex flex-col px-[6px] py-[10px] justify-center w-[84px] items-center rounded-xl bg-blur-dark-3">
          <SpaceSvg />
          <p className="text-grey-normal text-xs">Use SPACE to jump</p>
        </div>
      </div>
    </div>
  );
}

export default ControlsWidget;
