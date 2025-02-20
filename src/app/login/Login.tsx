"use client";
import React, { useState } from "react";
import Image from "next/image";
import SecondaryButton from "@/app/components/SecondaryButton";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForceLogin, setShowForceLogin] = useState(false);

  const handleLogin = async () => {
    const formData = { username, password };
    try {
      const response = await axiosInstance.post("auth/login", formData);

      if (response.data.refreshToken) {
        toast.success("Login Successful", { autoClose: 3000, theme: "dark" });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message === "User already loggedIn other device.") {
        toast.error("Already logged in on another device!", { autoClose: 3000, theme: "dark" });
        setShowForceLogin(true);
      } else {
        toast.error("Invalid Username or Password", { autoClose: 3000, theme: "dark" });
      }
    }
  };

  const handleForceLogout = async () => {
    try {
      await axiosInstance.post("auth/logout", { username });
      toast.success("Previous session logged out!", { autoClose: 3000, theme: "dark" });
      setShowForceLogin(false);
      handleLogin();
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout previous session", { autoClose: 3000, theme: "dark" });
    }
  };

  return (
    <div className="--login-wrapper w-full h-screen flex items-center relative">
      <div className="w-full h-[80%] mt-20 flex flex-col gap-10 justify-center items-center relative z-[50]">
        <Image src="/images/logo.png" alt="Scavenger Hunt" width={600} height={600} className="w-[80%] md:w-[30%]" />
        <div className="--login-container w-[90%] md:w-[80%] h-fit rounded-3xl relative overflow-hidden px-6 md:px-12 py-12">
          <div className="--content flex h-full flex-col gap-4 justify-center items-center">
            <div className="--heading text-center text-3xl md:text-5xl font-semibold uppercase">Enter your details</div>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            <SecondaryButton onClickHandler={handleLogin}>Proceed</SecondaryButton>

            {showForceLogin && (
              <button onClick={handleForceLogout} className="text-red-500 underline">
                Force Logout and Login
              </button>
            )}
          </div>
        </div>
        <div className="text-[#aaaaaa] text-sm md:text-lg">Note: Only one login allowed at the same time.</div>
      </div>

      <div className="--background fixed w-screen h-screen top-0 left-0 z-[20]">
        <div className="circle w-[70vw] md:w-[30vw] aspect-square bg-[#812d23] rounded-full blur-[100px] md:blur-[180px] absolute top-[-20vw] md:top-[-10vw] left-[-20vw] md:left-[-10vw]"></div>
        <div className="circle w-[70vw] md:w-[30vw] aspect-square bg-black rounded-full blur-[100px] md:blur-[150px] absolute top-[-40vw] md:top-[-20vw] right-[-20vw] md:right-[-10vw]"></div>
        <div className="circle w-[70vw] md:w-[30vw] aspect-square bg-black rounded-full blur-[100px] md:blur-[180px] absolute bottom-[-40vw] md:bottom-[-15vw] left-[-20vw] md:left-[-10vw]"></div>
        <div className="circle w-[70vw] md:w-[30vw] aspect-square bg-[#1a2c60] rounded-full blur-[100px] md:blur-[180px] absolute bottom-[-40vw] md:bottom-[-15vw] right-[-20vw] md:right-[-10vw]"></div>
      </div>
    </div>
  );
};

export default Login;
