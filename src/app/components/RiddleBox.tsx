import React from "react";
import SecondaryButton from "./SecondaryButton";
interface Props {
  riddle: string;
  redirect: string;
}
const RiddleBox = ({ riddle, redirect }: Props) => {
  return (
    <div className="w-full">
      <div className="--riddle-container w-full h-fit rounded-3xl relative overflow-hidden px-12 py-20">
        <div className="--inner-shadow border-[12px] border-white w-full h-full  blur-lg absolute top-0 left-0"></div>
        <div className="--content flex flex-col gap-12 justify-center items-center">
          <div className="--riddle-description mt-12 leading-relaxed tracking-wide ">
            {riddle}
          </div>
          <SecondaryButton>Proceed</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default RiddleBox;
