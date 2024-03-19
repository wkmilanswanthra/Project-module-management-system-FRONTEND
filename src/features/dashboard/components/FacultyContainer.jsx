import React from "react";
import { Table, Space, Button, Typography, ConfigProvider } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Roles } from "../../../assets/constants";

const { Text } = Typography;

const rolesList = Object.keys(Roles).map((role) => {
  return {
    text: role,
    value: role,
  };
});

const columns = [
  {
    title: "Faculty Members",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Space size="middle">
        <UserOutlined className="mx-4" style={{ fontSize: "22px" }} />
        <div>
          <div className="font-bold text-lg">{record.name}</div>
          <div className="">{record.position}</div>
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
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "20%",
    render: (text, record) => <Text>{record.role}</Text>,
    filters: rolesList,
    onFilter: (value, record) => record.role === value,
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "20%",
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
    width: "20%",
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
    title: "Actions",
    width: "20%",
    key: "actions",
    render: () => (
      <Space size="middle">
        <Button type="primary" icon={<PlusCircleOutlined />} />
        <Button type="primary" icon={<EditOutlined />} />
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Doe",
    position: "Professor",
    role: "STUDENT",
    email: "john@example.com",
    contact: "123-456-7890",
  },
  {
    key: "2",
    name: "Jane Smith",
    position: "Assistant Professor",
    role: "STUDENT",
    email: "jane@example.com",
    contact: "987-654-3210",
  },
];

function FacultyContainer() {
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
          Faculty Members
        </h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 15 }}
        />
      </div>
    </ConfigProvider>
  );
}

export default FacultyContainer;
