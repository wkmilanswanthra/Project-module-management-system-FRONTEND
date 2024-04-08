import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/pageNotFound.png";

const PageNotFound = () => {
  console.log("Not found page");
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full bg-gray-100">
      <img src={NotFoundImage} alt="404 Image" className="w-64 h-auto mb-8" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
