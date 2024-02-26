import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import RiddleBox from "../components/RiddleBox";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
interface RiddleData {
  user_id: string;
  question: string;
  difficulty: string;
  answer: string;
  points: string;
  difficultyLevel: string;
  answered: string;
}
interface Props {
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setMenu?: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Riddles = ({
  setQuestion,
  setPoints,
  setMenu,
  setDifficulty,
  setIsLoggedIn,
}: Props) => {
  const [riddleData, setRiddleData] = useState<RiddleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorLoadingRiddles, setErrorLoadingRiddles] = useState(false);
  const getDiffQue = async (diff: string) => {
    const token = Cookies.get("jwtToken");
    const id = localStorage.getItem("teamId");
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mfc-hunt-soty-be.vercel.app/questions/${id}?difficultyLevel=${diff}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRiddleData((prevData) => [...prevData, response.data]);
      setLoading(false);
    } catch (error) {
      setErrorLoadingRiddles(true);
    }
  };
  useEffect(() => {
    if (errorLoadingRiddles) {
      Cookies.remove("jwtToken");
      toast.error("Can't load riddles, Login Again!", {
        autoClose: 3000,
        theme: "dark",
      });

      toast.error("Multiple Logins detected", {
        autoClose: 3000,
        theme: "dark",
      });
      setIsLoggedIn(false);
    }
  }, [errorLoadingRiddles]);
  useEffect(() => {
    getDiffQue("easy");
    getDiffQue("medium");
    getDiffQue("hard");
  }, []);
  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <div className="--riddle-container w-[90%] md:w-[80%] h-full flex flex-col justify-start items-center gap-8 md:gap-12">
        <PrimaryButton>Riddles</PrimaryButton>
        {loading && (
          <p className="text-3xl text-white font-medium text-center">
            Loading Riddles...
          </p>
        )}
        {riddleData.map((riddle: any, i: number) => (
          <RiddleBox
            riddle={riddle.question}
            // redirect={riddle.redirect}
            difficulty={riddle.difficultyLevel}
            points={riddle.points}
            riddleId={riddle._id}
            key={i}
            setQuestion={setQuestion}
            setPoints={setPoints}
            setMenu={setMenu}
            setDifficulty={setDifficulty}
          />
        ))}
      </div>
    </div>
  );
};

export default Riddles;
