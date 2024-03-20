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
  UserOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Search } = Input;

const columns = [
  {
    title: "Student",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Space size="middle">
        <UserOutlined className="mx-4" style={{ fontSize: "22px" }} />
        <div>
          <div className="font-bold text-lg">{record.name}</div>
          <div>{record.registrationNumber}</div>
        </div>
      </Space>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    sorter: (a, b) => a.contact.localeCompare(b.contact),
    sortIcon: ({ sortOrder }) =>
      sortOrder === "ascend" ? (
        <SortAscendingOutlined />
      ) : (
        <SortDescendingOutlined />
      ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    key: "specialization",
    sorter: (a, b) => a.specialization.localeCompare(b.specialization),
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
    name: "John Doe",
    registrationNumber: "REG123",
    email: "john@example.com",
    contact: "07123456789",
    specialization: "Information Technology",
  },
  {
    key: "2",
    name: "Jane Smith",
    registrationNumber: "REG456",
    email: "jane@example.com",
    contact: "07123456789",
    specialization: "Software Engineering",
  },
];

function StudentsContainer() {
  const [searchData, setSearchdata] = React.useState([]);

  useEffect(() => {
    setSearchdata(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return (
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase()) ||
        record.contact.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchdata(filteredData);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Students</h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-ful justify-end">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchdata(data);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
          <Button icon={<PlusOutlined />} size={32} className="ml-8">
            Add Student
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

export default StudentsContainer;
