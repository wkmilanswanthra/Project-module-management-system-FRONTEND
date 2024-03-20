import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const AssessmentList = [
  {
    title: "Assessment 1",
    id: 1,
  },
  {
    title: "Assessment 2",
    id: 2,
  },
];

const CreateRubricsContainer = () => {
  const [criteriaRows, setCriteriaRows] = useState([
    { criteria: "", description: "", weightage: "", marks: "" },
  ]);

  const handleAddRow = () => {
    if (criteriaRows.length < 10) {
      setCriteriaRows([
        ...criteriaRows,
        { criteria: "", description: "", weightage: "", marks: "" },
      ]);
    }
  };

  const handleRemoveRow = (index) => {
    if (criteriaRows.length > 1) {
      const updatedRows = [...criteriaRows];
      updatedRows.splice(index, 1);
      setCriteriaRows(updatedRows);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedRows = [...criteriaRows];
    updatedRows[index][field] = value;
    setCriteriaRows(updatedRows);
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
          Create Rubric
        </h1>
        <form
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="assessmentSelect"
              >
                Select Assessment
              </label>
              <select
                id="assessmentSelect"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select assessment</option>
                {AssessmentList.map((assessment) => (
                  <option key={assessment.id} value={assessment.id}>
                    {assessment.title}
                  </option>
                ))}
              </select>
            </div>
            {criteriaRows.length < 9 && (
              <div className="col-span-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="px-4 py-2 text-sm bg-gray-900 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  <PlusOutlined /> Add Row
                </button>
              </div>
            )}
            {criteriaRows.map((row, index) => (
              <div key={index} className="relative grid grid-cols-2 gap-1 mt-8">
                <input
                  type="text"
                  placeholder="Criteria"
                  value={row.criteria}
                  onChange={(e) =>
                    handleCriteriaChange(index, "criteria", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) =>
                    handleCriteriaChange(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 resize-none"
                  required
                ></input>
                <input
                  type="number"
                  placeholder="Weightage"
                  value={row.weightage}
                  onChange={(e) =>
                    handleCriteriaChange(index, "weightage", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Marks"
                  value={row.marks}
                  onChange={(e) =>
                    handleCriteriaChange(index, "marks", e.target.value)
                  }
                  className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="absolute translate-x-[130%] right-0 top-0 mt-[0.3rem] mr-2 px-4 py-2 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                  >
                    <MinusCircleOutlined />
                  </button>
                )}
              </div>
            ))}

            <div className="mt-10 flex flex-col col-span-2 w-full items-center">
              <button
                type="submit"
                className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
              >
                Create Rubric
              </button>
              <Link
                to={".."}
                className="px-2 my-2 w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRubricsContainer;
