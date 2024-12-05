import Spinner from "@/components/Spinner";
import React from "react";

function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}

export default Loading;
