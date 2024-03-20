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
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => a.date.localeCompare(b.date),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => a.time.localeCompare(b.time),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Assessment Id",
    dataIndex: "assessmentId",
    key: "assessmentId",
    sorter: (a, b) => a.assessmentId.localeCompare(b.assessmentId),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Examiner 1",
    dataIndex: "examiner1",
    key: "examiner1",
    sorter: (a, b) => a.examiner1.localeCompare(b.examiner1),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Examiner 2",
    dataIndex: "examiner2",
    key: "examiner2",
    sorter: (a, b) => a.examiner2.localeCompare(b.examiner2),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Examiner 3",
    dataIndex: "examiner3",
    key: "examiner3",
    sorter: (a, b) => a.examiner3.localeCompare(b.examiner3),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
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
    date: "2024-03-20",
    time: "09:00 AM",
    assessmentId: "ASS123",
    examiner1: "Examiner 1",
    examiner2: "Examiner 2",
    examiner3: "Examiner 3",
  },
  {
    key: "2",
    date: "2024-03-21",
    time: "10:30 AM",
    assessmentId: "ASS456",
    examiner1: "Examiner 4",
    examiner2: "Examiner 5",
    examiner3: "Examiner 6",
  },
];

function ScheduleContainer() {
  const [searchData, setSearchData] = React.useState([]);

  useEffect(() => {
    setSearchData(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return (
        record.date.toLowerCase().includes(value.toLowerCase()) ||
        record.assessmentId.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner1.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner2.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner3.toLowerCase().includes(value.toLowerCase())
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Schedule</h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Search"
            onSearch={onSearch}
            style={{ width: 200, marginRight: 8 }}
            allowClear
          />
        </div>
        <Table
          className="mt-8"
          columns={columns}
          dataSource={searchData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </ConfigProvider>
  );
}

export default ScheduleContainer;
