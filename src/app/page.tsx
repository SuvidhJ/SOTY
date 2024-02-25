"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  return (
    <>
      <BaseWrapper>
        <NavWrapper>
          <MobileNav
            isLoggedIn={isLoggedIn}
            setMenu={setMenu}
            menu={menu}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Navbar
            isLoggedIn={isLoggedIn}
            setMenu={setMenu}
            menu={menu}
            setIsLoggedIn={setIsLoggedIn}
          />
        </NavWrapper>
        <MainWrapper>
          {isLoggedIn ? (
            <Landing
              selectedMenu={menu}
              setMenu={setMenu}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : menu === "faq" ? (
            <Landing
              selectedMenu={menu}
              setMenu={setMenu}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </MainWrapper>
      </BaseWrapper>
    </>
  );
}
