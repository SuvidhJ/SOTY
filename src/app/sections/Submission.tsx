"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRCodePlugin from "../components/QRCodePlugin";
const qrcodeRegionId = "html5qr-code-full-region";
interface Props {
  question: string;
  points: number;
  difficultyLevel: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function Submission({
  question,
  points,
  setMenu,
  difficultyLevel,
}: Props) {
  const [mutex, setMutex] = useState(false);
  const submitRiddle = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const id = localStorage.getItem("teamId");
      const data = {
        question,
        answer,
        points,
        difficultyLevel,
      };
      setMutex(true);
      const response = await axios.post(
        `https://mfc-hunt-soty-be.vercel.app/questions/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ` + `${token}`,
          },
        }
      );
      setMutex(false);
      if (response.data.message === "Correct answer!") {
        toast.success("Correct Answer", {
          className: "custom-bg",
          autoClose: 3000,
          theme: "dark",
        });
        setMenu("home");
      } else {
        toast.error("Incorrect Answer", {
          className: "custom-bg-error",
          autoClose: 3000,
          theme: "dark",
        });
      }
      console.log(response.data);
    } catch (error) {
      toast.error("Incorrect Input or Error", {
        className: "custom-bg-error",
        autoClose: 3000,
        theme: "dark",
      });
      console.log(error);
      setMutex(false);
    }
  };
  const [answer, setAnswer] = useState("");
  const [checker, setChecker] = useState("");
  const onNewScanResult = (decodedText: any, decodedResult: any) => {
    console.log(decodedText, decodedResult);
    setAnswer(decodedText);
    setChecker(decodedResult);
  };

  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[90%] md:w-[80%] h-full flex flex-col justify-start items-center gap-12">
        <PrimaryButton>SCAN</PrimaryButton>
        <QRCodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <textarea
          name="riddleAnswer"
          className="submission-box w-full md:w-[40%] min-h-[20vh] md:min-h-[20vh] rounded-2xl bg-[rgba(255,255,255,0.3)] p-6 border-2 border-white outline-none text-xl"
          placeholder="Write your answer here..."
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        ></textarea>
        <div className="btns flex justify-center md:justify-between w-[80%] scale-75">
          <PrimaryButton
            onClickHandler={() => {
              setMenu("home");
            }}
          >
            BACK
          </PrimaryButton>
          {mutex ? (
            <p className="text-3xl text-white font-medium">Submitting...</p>
          ) : (
            <SecondaryButton onClickHandler={submitRiddle}>
              SUBMIT
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
