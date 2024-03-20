import React from "react";
import { Link } from "react-router-dom";

const Assessments = [
  {
    id: 1,
    title: "Assessment 1",
  },
  {
    id: 2,
    title: "Assessment 2",
  },
];

const Examiners = [
  {
    id: 1,
    name: "Examiner 1",
  },
  {
    id: 2,
    name: "Examiner 2",
  },
  {
    id: 3,
    name: "Examiner 3",
  },
  {
    id: 4,
    name: "Examiner 4",
  },
  {
    id: 5,
    name: "Examiner 5",
  },
];

function CreateSchedule() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
        Schedule Presentation
      </h1>
      <form className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-900 mb-1"
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-900 mb-1"
              htmlFor="time"
            >
              Time
            </label>
            <input
              id="time"
              type="time"
              className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-900 mb-1"
              htmlFor="assessment"
            >
              Assessment
            </label>
            <select
              id="assessment"
              className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select an assessment</option>
              {Assessments.map((assessment) => (
                <option key={assessment.id} value={assessment.title}>
                  {assessment.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row flex-1 w-full justify-between">
            <div className="mb-6  w-[30%]">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="examiner1"
              >
                Examiner 1
              </label>
              <select
                id="examiner1"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Examiner 1">Examiner 1</option>
                <option value="Examiner 2">Examiner 2</option>
                <option value="Examiner 3">Examiner 3</option>
              </select>
            </div>
            <div className="mb-6  w-[30%]">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="examiner2"
              >
                Examiner 2
              </label>
              <select
                id="examiner2"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Examiner 1">Examiner 1</option>
                <option value="Examiner 2">Examiner 2</option>
                <option value="Examiner 3">Examiner 3</option>
              </select>
            </div>
            <div className="mb-6  w-[30%]">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="examiner3"
              >
                Examiner 3
              </label>
              <select
                id="examiner3"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Examiner 1">Examiner 1</option>
                <option value="Examiner 2">Examiner 2</option>
                <option value="Examiner 3">Examiner 3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center">
          <button
            type="submit"
            className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          >
            Schedule Presentation
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
  );
}

export default CreateSchedule;
