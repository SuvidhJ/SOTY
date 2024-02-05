import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export default function BaseWrapper({ children }: Props) {
  return (
    <div className="w-full overflow-x-hidden bg-black text-white font-monsterrat">
      {children}
    </div>
  );
}
