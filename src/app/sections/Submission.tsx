"use client";
import React, { useState, useEffect, useCallback } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import QRCodePlugin from "../components/QRCodePlugin";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://soty-backend-25.vercel.app";

interface Props {
  question: string;
  points: number;
  difficultyLevel: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function Submission({ question, points, setMenu, difficultyLevel }: Props) {
  const [mutex, setMutex] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswerable, setIsAnswerable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const token = localStorage.getItem("refreshToken"); // Consider moving to localStorage
  const teamId = localStorage.getItem("teamId");

  const canAnswer = useCallback(async () => {
    if (!teamId || !token) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/questions/answeringStatus/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      setIsAnswerable(response.data.canAnswer);
      setTimeLeft(response.data.remainingTime / 1000 || 0);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching answering status:", error);
    }
  }, [teamId, token]);

  const submitRiddle = useCallback(async () => {
    if (!answer.trim()) {
      toast.error("Answer cannot be empty", { theme: "dark", autoClose: 3000 });
      return;
    }
    if (!teamId || !token) {
      toast.error("Unauthorized", { theme: "dark", autoClose: 3000 });
      return;
    }

    try {
      setMutex(true);
      const response = await axios.post(
        `${API_BASE_URL}/questions/${teamId}`,
        { question, answer, points, difficultyLevel },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMutex(false);

      if (response.data.message === "Correct answer!") {
        toast.success("Correct Answer", { theme: "dark", autoClose: 3000 });
        setMenu("home");
      } else {
        toast.error("Incorrect Answer", { theme: "dark", autoClose: 3000 });
        await canAnswer();
      }
    } catch (error) {
      toast.error("Error submitting answer", { theme: "dark", autoClose: 3000 });
      setMutex(false);
    }
  }, [answer, teamId, token, question, points, difficultyLevel, setMenu, canAnswer]);

  useEffect(() => {
    canAnswer();
  }, [canAnswer]);

  useEffect(() => {
    if (!isAnswerable && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnswerable, timeLeft]);

  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="w-[90%] md:w-[80%] flex flex-col items-center gap-12">
        {loading && <p className="text-3xl text-white font-medium">Loading Scanner...</p>}
        {isAnswerable && !loading && <div className="text-3xl font-semibold">SCAN</div>}
        {!isAnswerable && (
          <div className="text-xl text-center p-2 border-2 border-white rounded-xl bg-red-600">
            Youve answered incorrectly too many times. Please wait {timeLeft}s to try again.
          </div>
        )}
        {isAnswerable && !loading && (
          <QRCodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSuccessCallback={setAnswer} />
        )}
        {isAnswerable && (
          <textarea
            className="w-full md:w-[40%] min-h-[20vh] p-6 border-2 border-white rounded-2xl bg-opacity-30"
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
        <div className="flex w-[80%]">
          <PrimaryButton onClickHandler={() => setMenu("home")}>BACK</PrimaryButton>
          {mutex ? <p className="text-3xl text-white">Submitting...</p> : <SecondaryButton onClickHandler={submitRiddle}>SUBMIT</SecondaryButton>}
        </div>
      </div>
    </div>
  );
}
