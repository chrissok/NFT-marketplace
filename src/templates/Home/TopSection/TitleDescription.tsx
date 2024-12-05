import React from "react";

function TitleDescription() {
  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-6 text-blue-light font-header text-[44px]">
        EMERGENCE
      </h2>
      <h1 className="mb-2 text-2xl text-grey-lightest  font-header opacity-70">
        Featured Collection:
      </h1>
      <h1 className="mb-3 text-2xl text-grey-lightest  font-header  opacity-70">
        WeRobot
      </h1>
      <p className="text-sm font-normal text-grey-normal font-header opacity-70">
        WeRobot is a featured collection. It features interoperable game-ready
        assets with high utility. Perfect for players and collectors.
      </p>
    </div>
  );
}

export default TitleDescription;
