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
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) => a.description.localeCompare(b.title),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Assessment Type",
    dataIndex: "assessmentType",
    key: "assessmentType",
  },
  {
    title: "Semester",
    dataIndex: "semester",
    key: "semester",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
    align: "center",
  },
];

const data = [
  {
    key: "1",
    title: "Assessment 1",
    description: "Description of Assessment 1",
    assessmentType: "Type 1",
    semester: "First",
  },
  {
    key: "2",
    title: "Assessment 2",
    description: "Description of Assessment 2",
    assessmentType: "Type 2",
    semester: "First",
  },
];

function AssessmentContainer() {
  const [searchData, setSearchData] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setSearchData(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return (
        record.title.toLowerCase().includes(value.toLowerCase()) ||
        record.description.toLowerCase().includes(value.toLowerCase()) ||
        record.assessmentType.toLowerCase().includes(value.toLowerCase()) ||
        record.semester.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchData(filteredData);
  };

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
          Assessments
        </h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData(data);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
          <Button onClick={() => navigate("create")} className="ml-8">
            Create Assessment
          </Button>
        </div>
        <Table
          className="mt-8"
          columns={columns}
          dataSource={searchData}
          pagination={{ pageSize: 15 }}
        />
      </div>
    </ConfigProvider>
  );
}

export default AssessmentContainer;
