import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
interface Props {
  menu: string;
  isLoggedIn: boolean;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileNav = ({ isLoggedIn, setMenu, menu, setIsLoggedIn }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full h-16 p-2 px-4 md:hidden flex justify-between items-center relative ">
      <Image
        src="/images/mfc-logo.png"
        width={100}
        height={100}
        alt="Mozilla Firefox Club VIT"
        className="w-10"
      />
      <Image
        src="/images/list.png"
        width={100}
        height={100}
        alt="Mozilla Firefox Club VIT"
        className="w-12 invert"
        onClick={() => setShowMenu(!showMenu)}
      />
      <motion.div
        className={`--list-items gap-4 fixed top-16 right-6 text-lg md:text-2xl font-semibold tracking-wide h-fit bg-black border-[1px] rounded-xl ${
          showMenu ? "flex flex-col p-4" : "hidden"
        } `}
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isLoggedIn && (
          <div
            className={`cursor-pointer ${
              menu === "home" && "bg-[#77737380] rounded-lg px-4 py-[1px]"
            }`}
            onClick={() => {
              setMenu("home");
              setShowMenu(false);
            }}
          >
            HOME
          </div>
        )}
        {!isLoggedIn && (
          <div
            className={`cursor-pointer `}
            onClick={() => {
              setMenu("home");
              setShowMenu(false);
            }}
          >
            Login
          </div>
        )}
        <div
          className={`cursor-pointer ${
            menu === "faq" && "bg-[#77737380] rounded-lg px-2 py-[1px]"
          }`}
          onClick={() => {
            setMenu("faq");
            setShowMenu(false);
          }}
        >
          FAQs
        </div>
        {isLoggedIn && (
          <>
            <div
              className={`cursor-pointer ${
                menu === "leaderboard" &&
                "bg-[#77737380] rounded-lg px-2 py-[1px]"
              }`}
              onClick={() => {
                setMenu("leaderboard");
                setShowMenu(false);
              }}
            >
              LEADERBOARD
            </div>
            {/* <div
              className={`cursor-pointer ${
                menu === "hints" && "bg-[#77737380] rounded-lg px-2 py-[1px]"
              }`}
              onClick={() => {
                setMenu("hints");
                setShowMenu(false);
              }}
            >
              HINTS
            </div> */}
            <div
              className={`cursor-pointer `}
              onClick={() => {
                Cookies.remove("jwtToken");
                toast.success("Logged out successfully");
                setIsLoggedIn(false);
                setShowMenu(false);
              }}
            >
              LOGOUT
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MobileNav;
