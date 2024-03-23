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
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Submission ID",
    dataIndex: "submissionId",
    key: "submissionId",
    sorter: (a, b) => a.submissionId.localeCompare(b.submissionId),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Group Name",
    dataIndex: "groupName",
    key: "groupName",
    sorter: (a, b) => a.groupName.localeCompare(b.assessmentTitle),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Assessment title",
    dataIndex: "assessmentTitle",
    key: "assessmentTitle",
    sorter: (a, b) => a.assessmentTitle.localeCompare(b.assessmentTitle),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Date of Submission",
    dataIndex: "dateSubmitted",
    key: "dateSubmitted",
    sorter: (a, b) => a.dateSubmitted.localeCompare(b.dateSubmitted),
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
    render: () => (
      <Space size="middle">
        <Button type="primary" icon={<EyeOutlined />} />
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
    width: "20%",
    align: "center",
  },
];

const data = [
  {
    submissionId: "1",
    groupName: "Group 1",
    assessmentTitle: "Assessment 1",
    dateSubmitted: "2021-08-01",
  },
  {
    submissionId: "2",
    groupName: "Group 2",
    assessmentTitle: "Assessment 2",
    dateSubmitted: "2021-08-02",
  },
];

function SubmissionsContainer() {
  const [searchData, setSearchData] = React.useState([]);

  useEffect(() => {
    setSearchData(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return record.submissionId.toLowerCase().includes(value.toLowerCase());
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
          Submissions
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

export default SubmissionsContainer;
