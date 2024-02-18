"use client";
import React, { useState } from "react";
import Image from "next/image";
import BaseWrapper from "./wrappers/baseWrapper";
import NavWrapper from "./wrappers/navWrapper";
import MainWrapper from "./wrappers/mainWrapper";
import Navbar from "./sections/Navbar";
import Landing from "./landing/Landing";
import Login from "./login/Login";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("home");
  return (
    <>
      <BaseWrapper>
        <NavWrapper>
          <Navbar
            isLoggedIn={isLoggedIn}
            setMenu={setMenu}
            menu={menu}
            setIsLoggedIn={setIsLoggedIn}
          />
        </NavWrapper>
        <MainWrapper>
          {isLoggedIn ? (
            <Landing selectedMenu={menu} setMenu={setMenu} />
          ) : menu === "faq" ? (
            <Landing selectedMenu={menu} setMenu={setMenu} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </MainWrapper>
      </BaseWrapper>
    </>
  );
}
