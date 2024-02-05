import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const NavWrapper = ({ children }: Props) => {
  return (
    <div className="w-full fixed top-0 left-0 z-[100] backdrop-blur-sm">
      {children}
    </div>
  );
};

export default NavWrapper;
