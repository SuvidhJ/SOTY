import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export default function MainWrapper({ children }: Props) {
  return <div className="w-full ">{children}</div>;
}
