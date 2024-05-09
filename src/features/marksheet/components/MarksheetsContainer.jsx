import React, { useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  ConfigProvider,
  Divider,
  Input,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllMarksheets, generateMarksheets, getMarksheetById } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";
import ViewMarksheetModal from "../modals/ViewMarksheetModal";
// import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const { Text } = Typography;
const { Search } = Input;

function MarksheetsContainer() {
  const [searchData, setSearchData] = React.useState([]);
  const { marksheets, marksheet } = useSelector((state) => state.marksheet);
  const [open, setOpen] = React.useState(false);
  const [gradeStatistics, setGradeStatistics] = React.useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMarksheets());
  }, []);

  useEffect(() => {
    setSearchData(marksheets);
    if (marksheets.length > 0) calculateGradeStatistics(marksheets);
  }, [marksheets]);

  const onSearch = (value) => {
    const filteredData = marksheets.filter((record) => {
      return record.marksheetId.toLowerCase().includes(value.toLowerCase());
    });
    setSearchData(filteredData);
  };

  const handleOpen = (id) => {
    setOpen(true);
    dispatch(getMarksheetById(id));
  };

  const calculateGradeStatistics = (data) => {
    const grades = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    };

    data.forEach((record) => {
      const totalMarks = calculateTotalOverallMarks(record);
      console.log(record.marksheet.marks.length);
      const grade = calculateGrade(
        (totalMarks / (10 * record.marksheet.marks.length)) * 100
      );
      console.log(grade);
      grades[grade]++;
    });

    const totalRecords = data.length;
    const passCount = grades["A"] + grades["B"] + grades["C"];
    const failCount = grades["D"] + grades["F"];
    const passPercentage = ((passCount / totalRecords) * 100).toFixed(2);
    const failPercentage = ((failCount / totalRecords) * 100).toFixed(2);

    const gradePercentages = {};
    for (let grade in grades) {
      gradePercentages[grade] = ((grades[grade] / totalRecords) * 100).toFixed(
        2
      );
    }

    setGradeStatistics({
      passCount,
      failCount,
      passPercentage,
      failPercentage,
      gradePercentages,
    });
    console.log(gradePercentages);
  };

  const calculateGrade = (score) => {
    if (score >= 80) return "A";
    else if (score >= 65) return "B";
    else if (score >= 50) return "C";
    else if (score >= 35) return "D";
    else return "F";
  };

  const calculateTotalMarks = (marks) => {
    return marks.reduce((total, mark) => total + parseInt(mark.marks), 0);
  };

  const calculateTotalOverallMarks = (marksheet) => {
    return marksheet?.marksheet?.marks?.reduce(
      (total, assessment) => total + calculateTotalMarks(assessment?.mark),
      0
    );
  };

  useEffect(() => {
    const gradePercentages = gradeStatistics?.gradePercentages;
    if (!gradePercentages) return;

    const grades = Object.keys(gradePercentages);
    const percentages = Object.values(gradePercentages);

    const data = grades.map((grade, index) => ({
      x: index,
      y: parseFloat(percentages[index]),
    }));

    const canvas = document.getElementById("bellCurveChart");

    const ctx = canvas.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",

      data: {
        labels: grades,
        datasets: [
          {
            label: "Grade Percentages",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            tension: 0.4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        scales: {
          x: {
            title: {
              display: true,
              text: "Grades",
            },
          },
          y: {
            title: {
              display: true,
              text: "Percentage (%)",
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [gradeStatistics]);

  const columns = [
    {
      title: "Marksheet ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.toString().localeCompare(b.id.toString()),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      sorter: (a, b) => a.studentId.localeCompare(b.studentId),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text, record) => <Text>{record?.marksheet?.student?.name}</Text>,
      sorter: (a, b) =>
        a.marksheet?.student?.name.localeCompare(b.marksheet?.student?.name),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
      sorter: (a, b) =>
        a.projectId.toString().localeCompare(b.projectId.toString()),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record, text) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleOpen(record.id)}
          />
        </Space>
      ),
      width: "20%",
      align: "center",
    },
  ];

  return (
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
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">
          Marksheets
        </h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData(marksheets);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
          <Button
            onClick={() =>
              dispatch(generateMarksheets()).then((res) => {
                if (res.payload) {
                  dispatch(getAllMarksheets());
                } else {
                  openNotificationWithIcon(
                    "error",
                    "Error",
                    "Failed to generate marksheets"
                  );
                }
              })
            }
            icon={<CheckCircleTwoTone />}
            size={32}
            className="ml-8"
          >
            Generate Marksheets
          </Button>
        </div>
        <Table
          className="mt-8"
          columns={columns}
          dataSource={searchData}
          pagination={{ pageSize: 15 }}
        />
        <Divider />
        <div className="mt-4" style={{ width: "500px" }}>
          <h3>Bell Curve: Grade Distribution</h3>

          <canvas id="bellCurveChart" width="400"></canvas>
        </div>
        <ViewMarksheetModal open={open} setOpen={setOpen} />
      </div>
    </ConfigProvider>
  );
}

export default MarksheetsContainer;
