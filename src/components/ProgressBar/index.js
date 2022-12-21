import React from "react";

const Index = ({ progress }) => {
  return (
    <div className="h-[10px] w-full bg-white/50 mt-10 rounded-md">
      <div
        style={{ width: `${progress}%` }}
        className={`h-full rounded-md ${
          progress > 30 ? "bg-green-600" : "bg-red-600"
        }`}
      ></div>
    </div>
  );
};

export default Index;
