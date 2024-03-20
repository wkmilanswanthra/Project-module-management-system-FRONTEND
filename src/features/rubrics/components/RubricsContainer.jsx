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
  EyeOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id.localeCompare(b.id),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Assessment",
    dataIndex: "assessment",
    key: "assessment",
    render: (text, record) => (
      <Space size="middle">
        <div>
          <div className="font-bold text-lg">{record.title}</div>
          <div>{record.assessmentId}</div>
        </div>
      </Space>
    ),
    sorter: (a, b) => a.title.localeCompare(b.title),
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
        <Button type="primary" icon={<EyeOutlined />} />
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
    id: "RUB001",
    title: "Assessment 1",
    assessmentId: "ASS001",
  },
  {
    key: "2",
    id: "RUB002",
    title: "Assessment 2",
    assessmentId: "ASS002",
  },
];

function RubricsContainer() {
  const [searchData, setSearchData] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchData(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return (
        record.id.toLowerCase().includes(value.toLowerCase()) ||
        record.title.toLowerCase().includes(value.toLowerCase())
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Rubrics</h1>
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
            Create Rubric
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

export default RubricsContainer;
