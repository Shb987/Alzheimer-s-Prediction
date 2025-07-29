import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-indigo-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Welcome to the App</h1>
        <p className="text-gray-600 mb-6">This is a simple login/register app built with FastAPI & React.</p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
