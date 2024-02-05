import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const BaseWrapper = ({ children }: Props) => {
  return (
    <div className="w-full overflow-x-hidden bg-black text-white font-monsterrat">
      {children}
    </div>
  );
};

export default BaseWrapper;
