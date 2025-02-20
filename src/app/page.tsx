"use client";
import React, { useState, useEffect } from "react";
import BaseWrapper from "./wrappers/baseWrapper";
import NavWrapper from "./wrappers/navWrapper";
import MainWrapper from "./wrappers/mainWrapper";
import Navbar from "./sections/Navbar";
import Landing from "./landing/Landing";
import Login from "./login/Login";
import MobileNav from "./sections/MobileNav";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("home");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const savedMenu = localStorage.getItem("menu");
      if (savedMenu) {
        setMenu(savedMenu);
      }
    };

    checkAuth(); 
    
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  return (
    <BaseWrapper>
      <NavWrapper>
        <MobileNav isLoggedIn={isLoggedIn} setMenu={setMenu} menu={menu} setIsLoggedIn={setIsLoggedIn} />
        <Navbar isLoggedIn={isLoggedIn} setMenu={setMenu} menu={menu} setIsLoggedIn={setIsLoggedIn} />
      </NavWrapper>
      <MainWrapper>
        {isLoggedIn || menu === "faq" ? (
          <Landing selectedMenu={menu} setMenu={setMenu} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </MainWrapper>
    </BaseWrapper>
  );
}
