import React from "react";
import { Link } from "react-router-dom";

const CreateAssessmentContainer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Create Assessment
        </h1>
        <form
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="assessmentTitle"
              >
                Assessment Title
              </label>
              <input
                id="assessmentTitle"
                type="text"
                placeholder="Enter assessment title"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                className="w-full h-32 text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 resize-none"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="assessmentType"
              >
                Assessment Type
              </label>
              <select
                id="assessmentType"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select assessment type</option>
                <option value="Presentation">Presentation</option>
                <option value="Report">Report</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="dueDateTime"
              >
                Due Date and Time
              </label>
              <input
                id="dueDateTime"
                type="datetime-local"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2 w-full items-center">
            <button
              type="submit"
              className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              Create Assessment
            </button>
            <Link
              to={".."}
              className="px-2 my-2 w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessmentContainer;
