import React from "react";
import { Table, ConfigProvider } from "antd";

const presentationMarksData = [
  {
    criteria: "Content",
    description: "Quality of content",
    weightage: 20,
    marks: 15,
    examiner1: 10,
    examiner2: 12,
    examiner3: 8,
  },
  {
    criteria: "Structure",
    description: "Organization and structure",
    weightage: 15,
    marks: 12,
    examiner1: 8,
    examiner2: 10,
    examiner3: 6,
  },
  {
    criteria: "Delivery",
    description: "Delivery and presentation skills",
    weightage: 25,
    marks: 20,
    examiner1: 15,
    examiner2: 18,
    examiner3: 12,
  },
  {
    criteria: "Visuals",
    description: "Use of visuals and multimedia",
    weightage: 10,
    marks: 8,
    examiner1: 5,
    examiner2: 6,
    examiner3: 4,
  },
  {
    criteria: "Conclusion",
    description: "Clarity of conclusion",
    weightage: 10,
    marks: 9,
    examiner1: 6,
    examiner2: 7,
    examiner3: 5,
  },
  {
    criteria: "Grammar",
    description: "Grammar and language usage",
    weightage: 10,
    marks: 7,
    examiner1: 4,
    examiner2: 5,
    examiner3: 3,
  },
  {
    criteria: "References",
    description: "Quality of references",
    weightage: 20,
    marks: 18,
    examiner1: 12,
    examiner2: 15,
    examiner3: 10,
  },
];

const reportMarksData = [
  {
    criteria: "Introduction",
    description: "Clarity of introduction",
    weightage: 10,
    marks: 8,
    examiner1: 5,
    examiner2: 6,
    examiner3: 4,
  },
  {
    criteria: "Methodology",
    description: "Appropriate research methodology",
    weightage: 15,
    marks: 13,
    examiner1: 9,
    examiner2: 10,
    examiner3: 8,
  },
  {
    criteria: "Analysis",
    description: "Quality of data analysis",
    weightage: 20,
    marks: 16,
    examiner1: 11,
    examiner2: 13,
    examiner3: 9,
  },
  {
    criteria: "Findings",
    description: "Clarity of findings",
    weightage: 15,
    marks: 11,
    examiner1: 7,
    examiner2: 8,
    examiner3: 6,
  },
  {
    criteria: "Discussion",
    description: "Depth of discussion",
    weightage: 20,
    marks: 17,
    examiner1: 12,
    examiner2: 15,
    examiner3: 10,
  },
  {
    criteria: "Conclusion",
    description: "Quality of conclusion",
    weightage: 10,
    marks: 9,
    examiner1: 6,
    examiner2: 7,
    examiner3: 5,
  },
  {
    criteria: "References",
    description: "Quality of references",
    weightage: 20,
    marks: 18,
    examiner1: 12,
    examiner2: 15,
    examiner3: 10,
  },
];

function AssessmentMarks({ type }) {
  type = "presentation";
  const data =
    type === "presentation" ? presentationMarksData : reportMarksData;

  let totalMarksObtained = 0;

  const columns = [
    { title: "Criteria", dataIndex: "criteria", key: "criteria" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Weightage",
      dataIndex: "weightage",
      key: "weightage",
      align: "center",
    },
    { title: "Marks", dataIndex: "marks", key: "marks", align: "center" },
  ];

  if (type === "presentation") {
    totalMarksObtained =
      (data.reduce((acc, curr) => acc + curr.examiner1, 0) +
        data.reduce((acc, curr) => acc + curr.examiner2, 0) +
        data.reduce((acc, curr) => acc + curr.examiner3, 0)) /
      3;
    columns.push(
      {
        title: "Examiner 1",
        dataIndex: "examiner1",
        key: "examiner1",
        align: "center",
      },
      {
        title: "Examiner 2",
        dataIndex: "examiner2",
        key: "examiner2",
        align: "center",
      },
      {
        title: "Examiner 3",
        dataIndex: "examiner3",
        key: "examiner3",
        align: "center",
      }
    );
  } else {
    totalMarksObtained =
      (data.reduce((acc, curr) => acc + curr.supervisor, 0) +
        data.reduce((acc, curr) => acc + curr.cosupervisor, 0)) /
      2;
    columns.push(
      {
        title: "Supervisor",
        dataIndex: "supervisor",
        key: "supervisor",
        align: "center",
      },
      {
        title: "Co-Supervisor",
        dataIndex: "cosupervisor",
        key: "cosupervisor",
        align: "center",
      }
    );
  }

  const totalWeightage = data.reduce((acc, curr) => acc + curr.weightage, 0);
  const percentage = (totalMarksObtained / totalWeightage) * 100;

  let grade = "";
  if (percentage >= 90) {
    grade = "A";
  } else if (percentage >= 80) {
    grade = "B";
  } else if (percentage >= 70) {
    grade = "C";
  } else if (percentage >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  return (
    <div>
      <div className="text-xl font-semibold mb-4">Assessment Summary</div>
      <div className="grid grid-cols-2 gap-8 mb-14">
        <div>
          <div className="text-lg font-semibold mb-4">Total marks:</div>
          <div className="text-5xl font-semibold mb-4">
            {totalMarksObtained.toFixed(0)}
          </div>
          <div className="text-lg font-semibold mb-4">Total Weightage:</div>
          <div className="text-5xl font-semibold mb-4">{totalWeightage}</div>
        </div>
        <div>
          <div className="text-lg font-semibold mb-4">Percentage:</div>
          <div className="text-5xl font-semibold mb-4">
            {percentage.toFixed(2)}%
          </div>
          <div className="text-lg font-semibold mb-4">Grade:</div>
          <div
            className={`text-5xl text-white font-semibold mb-4 rounded-lg w-16 h-16 flex items-center justify-center ml-10 ${
              grade === "A"
                ? "bg-green-400"
                : grade === "B"
                ? "bg-blue-400"
                : grade === "C"
                ? "bg-yellow-400"
                : grade === "D"
                ? "bg-orange-400"
                : "bg-red-400"
            }`}
          >
            {grade}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">
        {type === "presentation" ? "Presentation" : "Report"} Marks
      </h2>
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
          },
        }}
      >
        <Table
          className="mb-20"
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
}

export default AssessmentMarks;
