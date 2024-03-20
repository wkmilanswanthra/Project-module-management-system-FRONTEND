import React from "react";
import { Divider, Table, Input, ConfigProvider } from "antd";

const { TextArea } = Input;

const rubric = [
  {
    key: "1",
    criteria: "Criteria 1",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "2",
    criteria: "Criteria 2",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "3",
    criteria: "Criteria 3",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "4",
    criteria: "Criteria 4",
    description: "description",
    weightage: 10,
    marks: 10,
  },
];

const columns = [
  {
    title: "Criteria",
    dataIndex: "criteria",
    key: "criteria",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <TextArea rows={2} value={text} readOnly />,
  },
  {
    title: "Weightage",
    dataIndex: "weightage",
    key: "weightage",
  },
  {
    title: "Marks",
    dataIndex: "marks",
    key: "marks",
  },
  {
    title: "Student 1",
    dataIndex: "student1",
    key: "student1",
    render: () => <Input placeholder="Enter marks" />,
  },
  {
    title: "Student 2",
    dataIndex: "student2",
    key: "student2",
    render: () => <Input placeholder="Enter marks" />,
  },
  {
    title: "Student 3",
    dataIndex: "student3",
    key: "student3",
    render: () => <Input placeholder="Enter marks" />,
  },
  {
    title: "Student 4",
    dataIndex: "student4",
    key: "student4",
    render: () => <Input placeholder="Enter marks" />,
  },
];

function NewMarksheet() {
  return (
    <div className="flex flex-col items-start justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-10">Marksheet</h1>
      <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
      {/* Render assessment title, description, submission file download link */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Assessment Title:
        </h2>
        <p className="text-gray-700">Sample Assessment</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Description:</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="mb-6">
        <button className="px-4 text-xs bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out ">
          Download Submission File
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#222",
              headerColor: "#fff",
              headerFilterHoverBg: "#fff",
              headerSortActiveBg: "#222",
              headerSortHoverBg: "#222",
            },
            Button: {
              primaryColor: "#444",
              primaryBg: "#fff",
              dangerColor: "#FF3200",
            },
          },
        }}
      >
        <Table
          dataSource={rubric}
          columns={columns}
          pagination={false}
          bordered
          className="w-full"
        />{" "}
      </ConfigProvider>
      <div className="mt-12 w-full">
        <h2 className="text-xl font-semibold text-gray-900">Comments:</h2>
        <TextArea rows={4} className="md:w-[40%]" />
      </div>
      <div className="mt-6 mb-20 w-full flex justify-end">
        <button className="mr-10 px-4 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out ">
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewMarksheet;
