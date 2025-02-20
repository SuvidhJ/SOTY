"use client"; 

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/axios";
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


    const response = await axiosInstance.post("/auth/logout", { username });

    if (response.status === 200) {

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

      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
  } catch (error: any) {
    // More detailed error logging
    console.error("Logout error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    let errorMessage = "Logout failed. Please try again!";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 403:
          errorMessage = "Forbidden. You don't have permission to log out.";
          break;
        case 404:
          errorMessage = "Logout endpoint not found.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
      }
    }
    toast.error(errorMessage, { theme: "dark" });
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
