import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const GlowBox = ({ children }: Props) => {
  return (
    <div className="--riddle-container w-full h-fit rounded-3xl relative overflow-hidden px-8 md:px-12 py-10 md:py-20">
      <div className="--inner-shadow border-[8px] md:border-[12px] border-white w-full h-full  blur-lg absolute top-0 left-0"></div>
      <div className="inner-bg bg-[#9727bc] w-[60%] md:w-[40%] h-[60%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px]  md:blur-[150px] rounded-full z-[0]"></div>
      <div className="relative z-[10]">{children}</div>
    </div>
  );
};

export default GlowBox;
