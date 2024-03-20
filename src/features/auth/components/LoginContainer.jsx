import React from "react";
import { Link } from "react-router-dom";

const LoginContainer = ({ navigation }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Welcome Back
        </h1>
        <form className="w-full max-w-lg">
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-900 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-900 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col justify-between">
            <a
              className="text-sm text-gray-500 hover:text-blue-500 my-4"
              href="#"
            >
              Forgot your username or password?
            </a>
            <button
              type="submit"
              className="w-full py-3 bg-gray-900  text-white font-bold border border-black rounded-lg hover:bg-white hover:text-gray-900 hover:border-gray-300 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-500 mt-20 mb-2">
          Not registered yet?
        </div>
        <Link
          to="/signup"
          className="w-full text-center max-w-lg mt-4 bg-gray-300 border border-gray-300 hover:bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-sm transition duration-300 ease-in-out"
        >
          Sign Up as a Student
        </Link>
        <div className="text-sm text-gray-500 hover:text-blue-500 mt-4 mb-2">
          <Link to="/faculty/signup">
            <span className="font-bold"> Or </span>Sign Up as a faculty member
          </Link>
        </div>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500  text-sm ">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginContainer;
