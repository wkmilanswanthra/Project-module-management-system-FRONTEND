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

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Marksheet ID",
    dataIndex: "marksheetId",
    key: "marksheetId",
    sorter: (a, b) => a.marksheetId.localeCompare(b.marksheetId),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
  {
    title: "Group ID",
    dataIndex: "groupId",
    key: "groupId",
    sorter: (a, b) => a.groupId.localeCompare(b.groupId),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
  },
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
    key: "1",
    marksheetId: "MS001",
    groupId: "G001",
    submissionId: "SU001",
  },
  {
    key: "2",
    marksheetId: "MS002",
    groupId: "G001",
    submissionId: "SU002",
  },
];

function MarksheetsContainer() {
  const [searchData, setSearchData] = React.useState([]);

  useEffect(() => {
    setSearchData(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return record.marksheetId.toLowerCase().includes(value.toLowerCase());
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
          Marksheets
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

export default MarksheetsContainer;
