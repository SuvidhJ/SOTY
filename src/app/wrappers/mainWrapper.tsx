import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const MainWrapper = ({ children }: Props) => {
  return <div className="w-full ">{children}</div>;
};

export default MainWrapper;
