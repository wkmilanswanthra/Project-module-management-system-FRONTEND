import React from "react";
import { Table, ConfigProvider, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getRubricByAssessmentId } from "../../rubrics/api";
import { getMarkingBySubmissionId } from "../../marks/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandRow from "./../table/ExpandRow";
import { getScheduleByAssessmentId } from "../../schedule/api";
import CommentsComponent from "./CommentsComponent";

function AssessmentMarks({ data }) {
  const rubric = useSelector((state) => state.rubric);
  const marks = useSelector((state) => state.marks);
  const sche = useSelector((state) => state.schedule);
  const { project } = useSelector((state) => state.auth);

  const [assessmentType, setAssessmentType] = useState("");
  const [rubricData, setRubricData] = useState([]);
  const [markData, setMarkData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({});

  const dispatch = useDispatch();

  const id = useParams().id;

  console.log("data", data);

  useEffect(() => {
    dispatch(getScheduleByAssessmentId(id));
    dispatch(getRubricByAssessmentId(id));
    dispatch(getMarkingBySubmissionId(data?.id));
    setAssessmentType(data?.assessment?.assessmentType);
  }, []);

  useEffect(() => {
    if (rubric?.rubric?.criteria?.rubric) {
      setRubricData(rubric.rubric.criteria.rubric);
    }
  }, [rubric?.rubric]);
  console.log("assessmentType", assessmentType);

  useEffect(() => {
    if (marks?.marking?.marking) {
      setMarkData(marks.marking.marking);
    }
  }, [marks?.marking]);

  useEffect(() => {
    if (rubricData.length > 0 && markData.length > 0) {
      calculateMarks();
    }
  }, [rubricData, markData]);

  useEffect(() => {
    if (summary.totalMarks && summary.totalWeightage) {
      setSummary({
        ...summary,
        percentage: (summary.totalMarks / summary.totalWeightage) * 100,
      });
    }
  }, [tableData]);

  const calculateMarks = () => {
    let totMarks = 0;
    let totalWeightage = 0;
    const updatedTableData = rubricData.map((criteria, index) => {
      let updatedCriteria = { ...criteria, key: index };
      updatedCriteria.assessmentType = assessmentType;
      markData.forEach((mark) => {
        const examinerIds = [
          sche.schedule?.examiner1?.id,
          sche.schedule?.examiner2?.id,
          sche.schedule?.examiner3?.id,
        ];
        const supervisorId = project[0].supervisor.id;
        const coSupervisorId = project[0].coSupervisor.id;
        console.log("mark", mark);
        const getAssessorType = (marker) => {
          if (examinerIds.includes(marker)) return "examiner";
          if (marker === supervisorId) return "supervisor";
          if (marker === coSupervisorId) return "cosupervisor";
          return null;
        };

        mark.marks.forEach((m) => {
          const assessorType = getAssessorType(mark.marker);
          if (!assessorType) return;
          console.log("assessorType", assessorType);

          const assessorKey =
            assessorType + (assessorType === "examiner" ? mark.marker : "");
          const assessor = updatedCriteria[assessorKey] || {
            total: 0,
            ind: [],
          };

          m.marks?.forEach((n) => {
            if (n.criteria === criteria.criteria) {
              const z = {
                comments: m.comments,
                studentName: m.studentName,
                studentId: m.studentId,
                marks: n.marks,
              };
              assessor.total += parseInt(n.marks);
              assessor.ind.push(z);
            }
          });
          totMarks += assessor.total;
          updatedCriteria[assessorKey] = assessor;
        });
      });
      return updatedCriteria;
    });
    console.log("updatedTableData", updatedTableData);
    setTableData(updatedTableData);
    rubricData.forEach((criteria) => {
      totalWeightage += criteria.weightage;
    });
    assessmentType === "Presentation"
      ? setSummary({ totalMarks: totMarks / 3, totalWeightage: totalWeightage })
      : setSummary({
          totalMarks: totMarks / 2,
          totalWeightage: totalWeightage,
        });
  };

  const columns = [
    { title: "Criteria", dataIndex: "criteria", key: "criteria" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Weightage",
      dataIndex: "weightage",
      key: "weightage",
      align: "center",
    },
    { title: "Max Marks", dataIndex: "marks", key: "marks", align: "center" },
  ];

  if (assessmentType === "Presentation") {
    columns.push(
      {
        title: "Examiner 1 Total",
        dataIndex: "examiner1",
        key: "key",
        align: "center",
        render: (text, record) => <p>{record?.examiner1?.total}</p>,
      },
      {
        title: "Examiner 2 Total",
        dataIndex: "examiner2",
        key: "key",
        align: "center",
        render: (text, record) => <p>{record?.examiner2?.total}</p>,
      },
      {
        title: "Examiner 3 Total",
        dataIndex: "examiner3",
        key: "key",
        align: "center",
        render: (text, record) => <p>{record?.examiner3?.total}</p>,
      }
    );
  } else {
    columns.push(
      {
        title: "Supervisor Total",
        dataIndex: "supervisor",
        key: "key",
        align: "center",
        render: (text, record) => <p>{record.supervisor.total}</p>,
      },
      {
        title: "Co-Supervisor Total",
        dataIndex: "cosupervisor",
        key: "key",
        align: "center",
        render: (text, record) => <p>{record.cosupervisor?.total}</p>,
      }
    );
  }

  let grade = "";
  if (summary.percentage && summary.percentage >= 90) {
    grade = "A";
  } else if (summary.percentage && summary.percentage >= 80) {
    grade = "B";
  } else if (summary.percentage && summary.percentage >= 70) {
    grade = "C";
  } else if (summary.percentage && summary.percentage >= 60) {
    grade = "D";
  } else if (summary.percentage) {
    grade = "F";
  } else {
    grade = "N/A";
  }
  return (
    <div>
      <Spin spinning={false}>
        <div className="text-xl font-semibold mb-4">Assessment Summary</div>
        <div className="grid grid-cols-2 gap-8 mb-14">
          <div>
            <div className="text-lg font-semibold mb-4">Total marks:</div>
            <div className="text-5xl font-semibold mb-4">
              {summary?.totalMarks?.toFixed(0)}
            </div>
            <div className="text-lg font-semibold mb-4">Total Weightage:</div>
            <div className="text-5xl font-semibold mb-4">
              {summary?.totalWeightage?.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-4">Percentage:</div>
            <div className="text-5xl font-semibold mb-4">
              {(summary?.percentage / 5).toFixed(2)}%
            </div>
            <div className="text-lg font-semibold mb-4">Grade:</div>
            <div
              className={`${
                grade === "N/A" ? "text-xl" : "text-5xl"
              } text-white font-semibold mb-4 rounded-lg w-16 h-16 flex items-center justify-center ml-10 ${
                grade === "A"
                  ? "bg-green-400"
                  : grade === "B"
                  ? "bg-blue-400"
                  : grade === "C"
                  ? "bg-yellow-400"
                  : grade === "D"
                  ? "bg-orange-400"
                  : grade === "F"
                  ? "bg-red-400"
                  : "bg-gray-400"
              }`}
            >
              {grade}
            </div>
          </div>
        </div>
        <div className="text-xl font-semibold mb-4">Comments</div>
        <CommentsComponent
          data={data}
          marks={markData}
          project={project}
          assessmentType={assessmentType}
          rubric={rubricData}
        />
        <h2 className="text-xl font-semibold mb-4">
          {assessmentType === "Presentation" ? "Presentation" : "Report"} Marks
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
            dataSource={tableData}
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => ExpandRow(record),
            }}
          />
        </ConfigProvider>
      </Spin>
    </div>
  );
}

export default AssessmentMarks;
