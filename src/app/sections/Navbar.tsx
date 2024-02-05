import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Props {
  menu: string;
  isLoggedIn: boolean;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}
const Navbar = ({ isLoggedIn, setMenu, menu }: Props) => {
  return (
    <div className="w-full h-20 p-2 px-8  hidden md:flex justify-between items-center">
      <Image
        src="/images/mfc-logo.png"
        width={100}
        height={100}
        alt="Mozilla Firefox Club VIT"
        className="h-full w-auto"
      />
      <div className="--list-items flex gap-10 text-2xl font-semibold tracking-wide ">
        {isLoggedIn && (
          <div
            className={`cursor-pointer ${menu === "home" && "text-[#777373]"}`}
            onClick={() => setMenu("home")}
          >
            HOME
          </div>
        )}
        {!isLoggedIn && (
          <div className={`cursor-pointer `} onClick={() => setMenu("home")}>
            Login
          </div>
        )}
        <div
          className={`cursor-pointer ${menu === "faq" && "text-[#777373]"}`}
          onClick={() => setMenu("faq")}
        >
          FAQs
        </div>
        {isLoggedIn && (
          <>
            <div
              className={`cursor-pointer ${
                menu === "leaderboard" && "text-[#777373]"
              }`}
              onClick={() => setMenu("leaderboard")}
            >
              LEADERBOARD
            </div>
            <div
              className={`cursor-pointer ${
                menu === "hints" && "text-[#777373]"
              }`}
              onClick={() => setMenu("hints")}
            >
              HINTS
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
