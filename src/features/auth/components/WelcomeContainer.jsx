import React from "react";
import { Link } from "react-router-dom";

export default function WelcomeContainer() {
  return (
    <div className=" flex flex-col flex-1 justify-center items-center bg-gray-100">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center mt-40 md:mt-0 mb-8">
          <h1 className="text-4xl font-bold  mb-4">Welcome to Grade Master</h1>
          <p className="text-sm font-normal">
            Easiest way to manage your students' final year project
          </p>
        </div>
        <div className="flex md:justify-center md:flex-row flex-col ">
          <Link
            to="/login"
            className="bg-black text-white font-semibold text-lg border border-black px-[8rem] py-2 md:mr-4  hover:bg-white hover:text-black hover:border-gray-300 rounded-full transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-black text-white font-semibold text-lg border border-black px-[8rem] py-2 mt-4 md:mt-0 hover:bg-white hover:text-black hover:border-gray-300 rounded-full transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
}
