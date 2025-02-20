"use client"; 

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  menu: string;
  isLoggedIn: boolean;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isLoggedIn, setMenu, menu, setIsLoggedIn }: Props) => {
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      if (!token || !username) {
        toast.error("You are not logged in!", { theme: "dark" });
        return;
      }

      await axios.post(
        "https://soty-backend-25.vercel.app/auth/logout",
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


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

      
      router.push("/login"); 
    } catch (error) {
      toast.error("Logout failed. Please try again!", { theme: "dark" });
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-20 p-2 px-8 hidden md:flex justify-between items-center">
      <Image
        src="/images/mfc-logo.png"
        width={100}
        height={100}
        alt="Mozilla Firefox Club VIT"
        className="h-full w-auto"
      />
      <div className="--list-items flex gap-10 text-2xl font-semibold tracking-wide">
        {isLoggedIn && (
          <div
            className={`cursor-pointer ${menu === "home" && "text-purple-400"}`}
            onClick={() => setMenu("home")}
          >
            HOME
          </div>
        )}
        {!isLoggedIn && (
          <div className={`cursor-pointer`} onClick={() => setMenu("home")}>
            Login
          </div>
        )}
        <div
          className={`cursor-pointer ${menu === "faq" && "text-purple-400"}`}
          onClick={() => setMenu("faq")}
        >
          FAQs
        </div>
        {isLoggedIn && (
          <>
            <div
              className={`cursor-pointer ${
                menu === "leaderboard" && "text-purple-400"
              }`}
              onClick={() => setMenu("leaderboard")}
            >
              LEADERBOARD
            </div>
            <div className={`cursor-pointer`} onClick={handleLogout}>
              LOGOUT
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
