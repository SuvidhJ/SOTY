import React from "react";
interface Props {
  children: string;
  onClickHandler?: any;
}
const SecondaryButton = ({ children, onClickHandler }: Props) => {
  return (
    <div
      className="w-fit px-8 md:px-12 py-4 rounded-full text-xl md:text-3xl font-semibold shadow-md  active:scale-95 transition-all duration-100 ease-linear cursor-pointer select-none relative z-20 scale-75 md:scale-100 text-nowrap"
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
