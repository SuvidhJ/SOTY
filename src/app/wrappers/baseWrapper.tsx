import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: ReactNode;
}
export default function BaseWrapper({ children }: Props) {
  return (
    <>
      <div className="w-full overflow-x-hidden bg-bg_purple text-white font-monsterrat">
        {children}
      </div>
      <ToastContainer />
    </>
  );
}
