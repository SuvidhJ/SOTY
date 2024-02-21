import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: ReactNode;
}
export default function BaseWrapper({ children }: Props) {
  return (
    <>
      <div
        className="w-full overflow-x-hidden  text-white font-monsterrat"
        style={{ background: "/images/background.jpg" }}
      >
        {children}
      </div>
      <ToastContainer />
    </>
  );
}
