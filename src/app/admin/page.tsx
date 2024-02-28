"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode, JwtPayload } from "jwt-decode";
const showPerPage = 20;
interface LeaderboardData {
  username: string;
  score: number | null;
  isBan: boolean;
}
export default function Admin() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(-1);
  const [changedValue, setChangedValue] = useState<number | null>(null);
  const [changedUsername, setChangedUsername] = useState("");
  const router = useRouter();
  const handleNextPage = () => {
    if (page + 1 < leaderboardData.length / showPerPage) setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  interface CustomJwtPayload extends JwtPayload {
    isAdmin: boolean;
  }
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (!token || token === "") {
      router.push("/");
      return;
    }
    const decodedData: CustomJwtPayload = jwtDecode(token);
    if (!decodedData?.isAdmin) {
      router.push("/");

      return;
    }
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://mfc-hunt-soty-be.vercel.app/users/allusers"
        );
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error loading data!", {
          className: "custom-bg-error",
          autoClose: 3000,
          theme: "dark",
        });
      }
    })();
  }, []);
  const handleSave = async () => {
    if (changedValue !== null || changedValue !== "") {
      const newLeaderboardArray = leaderboardData.map(
        (item: LeaderboardData, i: number) =>
          i === isEditing ? { ...item, score: changedValue } : item
      );
      setLeaderboardData(newLeaderboardArray);
      setIsEditing(-1);
      setChangedValue(null);
      const token = Cookies.get("jwtToken");
      try {
        const reqBody = {
          username: leaderboardData[isEditing].username,
          newscore: changedValue,
        };
        const response = await axios.put(
          `https://mfc-hunt-soty-be.vercel.app/users/updatescore`,
          reqBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.message == "Access Forbidden: Admin only") {
          toast.error("Only Admins can change scores!", {
            className: "custom-bg-error",
            autoClose: 3000,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error("Error updating score", {
          className: "custom-bg-error",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <ToastContainer />
      <div className="--leaderboard-container w-[90%] md:w-[80%] h-full flex flex-col justify-start items-center gap-12 text-white">
        <PrimaryButton>Admin Panel</PrimaryButton>
        <div
          className="--leaderboard-table-wrapper w-full rounded-2xl border-2 border-white overflow-hidden backdrop-blur-lg py-4 px-2 md:px-0.5"
          style={{
            background: "linear-gradient(to bottom, #401E1C , rgba(0,0,0,0))",
          }}
        >
          {loading ? (
            <p className="text-3xl text-white font-medium text-center p-8">
              Loading Data...
            </p>
          ) : (
            leaderboardData.length > 0 && (
              <table className="w-full my-8">
                <thead className="text-lg md:text-xl underline-offset-4 underline font-medium">
                  <th>Rank</th>
                  <th>Team Name</th>
                  <th>Score</th>
                  <th>Editing</th>
                </thead>
                <br />
                {leaderboardData &&
                  leaderboardData.map((data: LeaderboardData, i) => (
                    <React.Fragment key={i}>
                      {i < showPerPage * (page + 1) &&
                        i >= showPerPage * page && (
                          <tbody>
                            <tr
                              className={`--leaderboard-menu-item h-12 md:h-12 text-center text-lg md:text-2xl font-semibold border-b-[1px] border-white ${
                                data.isBan ? "bg-red-600" : ""
                              }`}
                              key={i}
                            >
                              <td className="">{i + 1}</td>
                              <td>
                                {data?.username.length > 15
                                  ? `${data?.username.slice(0, 15)}...`
                                  : data?.username}
                              </td>
                              <td>
                                {isEditing !== i ? (
                                  data?.score
                                ) : (
                                  <input
                                    type="number"
                                    className="w-32  rounded-xl text-black text-center"
                                    onChange={(e) =>
                                      setChangedValue(parseInt(e.target.value))
                                    }
                                  ></input>
                                )}
                              </td>
                              <td>
                                {isEditing >= 0 ? (
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      type="button"
                                      className="text-black bg-white px-4 py-1 rounded-full text-sm"
                                      onClick={() => {
                                        setIsEditing(-1);
                                        handleSave();
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="text-black bg-white px-4 py-1 rounded-full text-sm"
                                      onClick={() => {
                                        setIsEditing(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    className="text-black bg-white px-4 py-1 rounded-full text-sm"
                                    onClick={() => setIsEditing(i)}
                                  >
                                    Edit
                                  </button>
                                )}
                                {data?.isBan ? (
                                  <button className="text-black bg-white px-4 py-1 rounded-full text-sm ml-2">
                                    Unban
                                  </button>
                                ) : (
                                  <button className="text-black bg-white px-4 py-1 rounded-full text-sm ml-2">
                                    Ban
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        )}
                    </React.Fragment>
                  ))}
              </table>
            )
          )}
          <div className="buttons flex justify-center md:justify-between items-center md:px-6">
            <div className="scale-[65%]">
              <SecondaryButton onClickHandler={handlePrevPage}>
                &larr; Prev
              </SecondaryButton>
            </div>
            <p className="text-sm text-nowrap md:text-xl text-white font-semibold">
              Page: {page + 1}
            </p>
            <div className="scale-[65%]">
              <SecondaryButton onClickHandler={handleNextPage}>
                Next &rarr;
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
