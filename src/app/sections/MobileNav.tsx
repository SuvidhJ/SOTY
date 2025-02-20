"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface Props {
  menu: string;
  isLoggedIn: boolean;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ isLoggedIn, setMenu, menu, setIsLoggedIn }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    toast.success("Logged out successfully", {
      className: "custom-bg",
      autoClose: 3000,
      theme: "dark",
    });

    setIsLoggedIn(false);
    setMenu("home");
    setShowMenu(false);

    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  return (
    <div className="w-full h-16 p-2 px-4 md:hidden flex justify-between items-center relative">
      <Image
        src="/images/mfc-logo.png"
        width={100}
        height={100}
        alt="Mozilla Firefox Club VIT"
        className="w-10"
      />

      <div
        className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <motion.div
          animate={{ rotate: showMenu ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/list.png"
            width={100}
            height={100}
            alt="Menu"
            className="w-10 invert"
          />
        </motion.div>
      </div>

      <motion.div
        ref={menuRef}
        className={`fixed top-16 right-6 w-48 bg-black border border-gray-700 rounded-xl shadow-lg ${
          showMenu ? "flex flex-col p-4" : "hidden"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={showMenu ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoggedIn && (
          <div
            className={`cursor-pointer ${
              menu === "home" && "bg-gray-700 rounded-lg px-4 py-2"
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
            className="cursor-pointer"
            onClick={() => {
              setMenu("home");
              setShowMenu(false);
              router.push("/login");
            }}
          >
            LOGIN
          </div>
        )}
        <div
          className={`cursor-pointer ${
            menu === "faq" && "bg-gray-700 rounded-lg px-4 py-2"
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
                menu === "leaderboard" && "bg-gray-700 rounded-lg px-4 py-2"
              }`}
              onClick={() => {
                setMenu("leaderboard");
                setShowMenu(false);
              }}
            >
              LEADERBOARD
            </div>
            <div
              className="cursor-pointer text-red-400 hover:text-red-500"
              onClick={handleLogout}
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
