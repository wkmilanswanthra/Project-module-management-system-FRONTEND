import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert } from "antd";

function Welcome({ project }) {
  const { emailVerified } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {emailVerified === false && (
        <Alert
          message="Email not verified"
          description="Please verify your email to continue."
          type="warning"
          showIcon
          closable
          className="absolute top-32 w-[80%]"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Grade Master
      </h1>
      <div className="max-w-[30%] text-center mt-5 mb-5">
        It seems like you are not part of any project yet. Create a project by
        clicking the button below or join one to view course material.
      </div>
      {!project && (
        <Link
          to="create-project"
          className="py-2 px-5 bg-gray-900  text-white font-bold border border-black rounded-lg hover:bg-white hover:text-gray-900 hover:border-gray-300 transition duration-300 ease-in-out"
        >
          Create Project
        </Link>
      )}
    </div>
  );
}

export default Welcome;
