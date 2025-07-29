import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await axios.post("http://localhost:8000/login", {
        username,
        password
      }, {
        withCredentials: true
      });
      navigate("/home");
    } catch (err) {
      setMsg(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
        >
          Log In
        </button>

        {msg && (
          <p className="mt-4 text-center text-sm text-red-500">
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
