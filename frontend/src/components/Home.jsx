import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/home", { withCredentials: true })
      .then((res) => setMsg(res.data.msg))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-300">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-purple-700 mb-4">{msg}</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
