"use client";
import React, { useState } from "react";
import Image from "next/image";
import BaseWrapper from "./wrappers/baseWrapper";
import NavWrapper from "./wrappers/navWrapper";
import MainWrapper from "./wrappers/mainWrapper";
import Navbar from "./sections/Navbar";
import Landing from "./landing/page";
import Login from "./landing/login/page";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("home");
  return (
    <>
      <BaseWrapper>
        <NavWrapper>
          <Navbar isLoggedIn={isLoggedIn} setMenu={setMenu} menu={menu} />
        </NavWrapper>
        <MainWrapper>
          {menu === "faq" ? (
            <Landing menu={menu} />
          ) : isLoggedIn ? (
            <Landing menu={menu} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </MainWrapper>
      </BaseWrapper>
    </>
  );
}
