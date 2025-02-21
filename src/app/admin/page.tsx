"use client";

import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import axiosInstance from "@/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const SHOW_PER_PAGE = 20;

interface LeaderboardData {
  username: string;
  score: number | null;
  isBan: boolean;
}

interface CustomJwtPayload {
  isAdmin: boolean;
}

export default function Admin() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [changedValue, setChangedValue] = useState<number | "">("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decodedData: CustomJwtPayload = jwtDecode(token);
      if (!decodedData?.isAdmin) {
        router.push("/admin");
        return;
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/users/allusers");
        setLeaderboardData(response.data);
      } catch (error) {
        toast.error("Error loading data!", { autoClose: 3000, theme: "dark" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleSave = async () => {
    if (isEditing === null || changedValue === "") return;

    const updatedData = leaderboardData.map((item, index) =>
      index === isEditing ? { ...item, score: changedValue } : item
    );
    setLeaderboardData(updatedData);
    setIsEditing(null);
    setChangedValue("");

    try {
      await axiosInstance.put(
        "/users/updatescore",
        {
          username: leaderboardData[isEditing].username,
          newscore: changedValue,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Score updated successfully!");
    } catch (error) {
      toast.error("Error updating score");
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center py-12">
      <ToastContainer />
      <div className="w-[90%] md:w-[80%] flex flex-col items-center gap-12 text-white">
        <PrimaryButton>Admin Panel</PrimaryButton>
        <div className="w-full rounded-2xl border-2 border-white overflow-hidden backdrop-blur-lg py-4 px-2 md:px-0.5" style={{ background: "linear-gradient(to bottom, #401E1C , rgba(0,0,0,0))" }}>
          {loading ? (
            <p className="text-3xl text-white font-medium text-center p-8">Loading Data...</p>
          ) : (
            <table className="w-full my-8">
              <thead className="text-lg md:text-xl underline font-medium">
                <tr>
                  <th>Rank</th>
                  <th>Team Name</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.slice(page * SHOW_PER_PAGE, (page + 1) * SHOW_PER_PAGE).map((data, i) => (
                  <tr key={i} className={`h-12 text-center text-lg md:text-2xl font-semibold border-b border-white ${data.isBan ? "bg-red-600" : ""}`}>
                    <td>{page * SHOW_PER_PAGE + i + 1}</td>
                    <td>{data.username.length > 15 ? `${data.username.slice(0, 15)}...` : data.username}</td>
                    <td>
                      {isEditing === i ? (
                        <input
                          type="number"
                          className="w-32 rounded-xl text-black text-center"
                          value={changedValue}
                          onChange={(e) => setChangedValue(parseInt(e.target.value) || "")}
                        />
                      ) : (
                        data.score
                      )}
                    </td>
                    <td>
                      {isEditing === i ? (
                        <div className="flex gap-2 justify-center">
                          <button className="text-black bg-white px-4 py-1 rounded-full text-sm" onClick={handleSave}>Save</button>
                          <button className="text-black bg-white px-4 py-1 rounded-full text-sm" onClick={() => setIsEditing(null)}>Cancel</button>
                        </div>
                      ) : (
                        <button className="text-black bg-white px-4 py-1 rounded-full text-sm" onClick={() => { setIsEditing(i); setChangedValue(data.score ?? ""); }}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-between items-center px-6">
            <SecondaryButton onClickHandler={() => setPage((prev) => Math.max(0, prev - 1))}>&larr; Prev</SecondaryButton>
            <p className="text-xl text-white font-semibold">Page: {page + 1}</p>
            <SecondaryButton onClickHandler={() => setPage((prev) => (prev + 1 < leaderboardData.length / SHOW_PER_PAGE ? prev + 1 : prev))}>Next &rarr;</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
