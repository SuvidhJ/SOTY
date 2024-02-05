import React from "react";
interface Props {
  children: string;
  onClickHandler?: any;
}
const SecondaryButton = ({ children, onClickHandler }: Props) => {
  return (
    <div
      className="w-fit px-12 py-4 rounded-full text-3xl font-semibold shadow-md  active:scale-95 transition-all duration-100 ease-linear cursor-pointer select-none"
      style={{
        background: "linear-gradient(to bottom,#CD6AFF ,#7E94FF)",
      }}
      onClick={() => {
        onClickHandler && onClickHandler();
      }}
    >
      {children}
    </div>
  );
};

export default SecondaryButton;
