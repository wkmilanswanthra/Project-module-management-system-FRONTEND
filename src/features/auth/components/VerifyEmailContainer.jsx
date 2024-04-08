import React from "react";

function VerifyEmailContainer() {
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
          <h1 className="text-4xl font-bold  mb-4">Verify email address</h1>
        </div>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
}

export default VerifyEmailContainer;
