import React from "react";
interface Props {
  children: string;
}
const PrimaryButton = ({ children }: Props) => {
  return (
    <div
      className="w-fit px-12 py-4 rounded-full text-3xl font-semibold shadow-md"
      style={{ background: "linear-gradient(to right,#AA00FF ,#3D00A6)" }}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
