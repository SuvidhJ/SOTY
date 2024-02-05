import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const GlowBox = ({ children }: Props) => {
  return (
    <div className="--riddle-container w-full h-fit rounded-3xl relative overflow-hidden px-12 py-20">
      <div className="--inner-shadow border-[12px] border-white w-full h-full  blur-lg absolute top-0 left-0"></div>
      {children}
    </div>
  );
};

export default GlowBox;
