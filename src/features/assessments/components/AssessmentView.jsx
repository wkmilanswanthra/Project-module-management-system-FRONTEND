import React from "react";
import { Divider, Tag } from "antd";

function AssessmentView({ data }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Description:</h3>
        <p className="text-gray-700">{data?.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Due Date:</h3>
        <p className="text-gray-700">
          {new Date(data?.dueDate).toLocaleDateString()} -{" "}
          {new Date(data?.dueDate).toLocaleTimeString()}
        </p>
      </div>
      {/* <div className="mb-4">
        <h3 className="text-lg font-semibold">Max Marks:</h3>
        <p className="text-gray-700">100</p>
      </div> */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Type:</h3>
        <div>
          <Tag color="green">{data?.assessmentType}</Tag>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Additional Files:</h3>
        <a href="#" className="text-blue-500 underline">
          Download Files
        </a>
      </div>
    </div>
  );
}

export default AssessmentView;
