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
        const response = await canAnswer();
        if (response.canAnswer) {
          setIsAnswerable(true);
          console.log(true);
        } else {
          setIsAnswerable(false);
          console.log(false);
        }
      }
    } catch (error) {
      toast.error("Incorrect Input or Error", {
        className: "custom-bg-error",
        autoClose: 3000,
        theme: "dark",
      });
      setMutex(false);
    }
  };
  const canAnswer = async () => {
    const token = Cookies.get("jwtToken");
    const id = localStorage.getItem("teamId");
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mfc-hunt-soty-be.vercel.app/questions/answeringStatus/${id}`,
        {
          headers: {
            Authorization: `Bearer ` + `${token}`,
          },
        }
      );
      setLoading(false);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const [answer, setAnswer] = useState("");
  const [checker, setChecker] = useState("");
  const [isAnswerable, setIsAnswerable] = useState(true);
  const [loading, setLoading] = useState(false);
  const onNewScanResult = (decodedText: any, decodedResult: any) => {
    console.log(decodedText, decodedResult);
    setAnswer(decodedText);
    setChecker(decodedResult);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await canAnswer();
        if (response.canAnswer) {
          setIsAnswerable(true);
          setTimeLeft(0);
          console.log(true);
        } else {
          setIsAnswerable(false);
          setTimeLeft(response.remainingTime / 1000);
          console.log(false);
        }
      } catch (error) {
        console.log("Error");
      }
    })();
  }, []);
  setTimeout(() => {
    if (timeLeft > 1) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);
  const [timeLeft, setTimeLeft] = useState(0);
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[90%] md:w-[80%] h-full flex flex-col justify-start items-center gap-12">
        {loading && (
          <p className="text-3xl text-white font-medium text-center">
            Loading Scanner...
          </p>
        )}
        {isAnswerable && !loading && <PrimaryButton>SCAN</PrimaryButton>}
        {!isAnswerable && timeLeft !== null && (
          <div className="text-xl text-center p-2 border-2 border-white rounded-xl bg-red-600 -mt-10">
            You&apos;ve answered 2 incorrect answers in a row
            <br />
            <br />
            Please wait for{" "}
            {timeLeft === 0
              ? "Please refresh the page to continue..."
              : timeLeft === null
              ? `2 mins`
              : `${Math.trunc(timeLeft)}s`}{" "}
            to Try Again
          </div>
        )}
        {isAnswerable && !loading && (
          <QRCodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        )}
        {isAnswerable && !loading && (
          <textarea
            name="riddleAnswer"
            className="submission-box w-full md:w-[40%] min-h-[20vh] md:min-h-[20vh] rounded-2xl bg-[rgba(255,255,255,0.3)] p-6 border-2 border-white outline-none text-xl"
            placeholder="Write your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          ></textarea>
        )}
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
            isAnswerable && (
              <SecondaryButton onClickHandler={submitRiddle}>
                SUBMIT
              </SecondaryButton>
            )
          )}
        </div>
      </div>
    </div>
  );
}
