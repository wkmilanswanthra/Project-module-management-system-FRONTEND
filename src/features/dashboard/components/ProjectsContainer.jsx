import React from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  ConfigProvider,
  Divider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const columns = [
  {
    title: "Project Title",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Space size="middle">
        <UserOutlined className="mx-4" style={{ fontSize: "22px" }} />
        <div>
          <div className="font-bold text-lg">{record.title}</div>
          <div>{record.researchGroup}</div>
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
    title: "Supervisor",
    dataIndex: "supervisor",
    key: "supervisor",
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Co-supervisor",
    dataIndex: "coSupervisor",
    key: "coSupervisor",
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Member 1",
    dataIndex: "member1",
    key: "member1",
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Member 2",
    dataIndex: "member2",
    key: "member2",
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Member 3",
    dataIndex: "member3",
    key: "member3",
    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Member 4",
    dataIndex: "member4",
    key: "member4",

    filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    title: "Project 1",
    researchGroup: "Natural Language Processing",
    supervisor: "Supervisor 1",
    coSupervisor: "Co-supervisor 1",
    member1: "Member 1",
    member2: "Member 2",
    member3: "Member 3",
    member4: "Member 4",
  },
  {
    key: "2",
    title: "Project 2",
    researchGroup: "Natural Language Processing",
    supervisor: "Supervisor 2",
    coSupervisor: "Co-supervisor 2",
    member1: "Member 1",
    member2: "Member 2",
    member3: "Member 3",
    member4: "Member 4",
  },
];

function ProjectsContainer() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Projects</h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <Table
          className="mt-8"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 15 }}
        />
      </div>
    </ConfigProvider>
  );
}

export default ProjectsContainer;
