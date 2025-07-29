import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("http://localhost:8000/register", {
        username,
        password,
      });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-teal-300">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-teal-600 mb-6">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition"
        >
          Register
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
