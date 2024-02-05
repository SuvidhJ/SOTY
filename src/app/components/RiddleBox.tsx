import React from "react";
import SecondaryButton from "./SecondaryButton";
import GlowBox from "./GlowBox";
interface Props {
  riddle: string;
  redirect: string;
}
const RiddleBox = ({ riddle, redirect }: Props) => {
  return (
    <div className="w-full">
      <GlowBox>
        <div className="--content flex flex-col gap-12 justify-center items-center">
          <div className="--riddle-description mt-12 leading-relaxed tracking-wide ">
            {riddle}
          </div>
          <SecondaryButton>Proceed</SecondaryButton>
        </div>
      </GlowBox>
    </div>
  );
};

export default RiddleBox;
