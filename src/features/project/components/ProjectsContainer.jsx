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
  },
  {
    title: "Supervisor",
    dataIndex: "supervisor",
    key: "supervisor",
  },
  {
    title: "Co-supervisor",
    dataIndex: "coSupervisor",
    key: "coSupervisor",
  },
  {
    title: "Member 1",
    dataIndex: "member1",
    key: "member1",
  },
  {
    title: "Member 2",
    dataIndex: "member2",
    key: "member2",
  },
  {
    title: "Member 3",
    dataIndex: "member3",
    key: "member3",
  },
  {
    title: "Member 4",
    dataIndex: "member4",
    key: "member4",
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
    align: "center",
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
  const [searchData, setSearchdata] = React.useState([]);

  useEffect(() => {
    setSearchdata(data);
  }, []);

  const onSearch = (value) => {
    const filteredData = data.filter((record) => {
      return (
        record.title.toLowerCase().includes(value.toLowerCase()) ||
        record.researchGroup.toLowerCase().includes(value.toLowerCase()) ||
        record.supervisor.toLowerCase().includes(value.toLowerCase()) ||
        record.coSupervisor.toLowerCase().includes(value.toLowerCase()) ||
        record.member1.toLowerCase().includes(value.toLowerCase()) ||
        record.member2.toLowerCase().includes(value.toLowerCase()) ||
        record.member3.toLowerCase().includes(value.toLowerCase()) ||
        record.member4.toLowerCase().includes(value.toLowerCase())
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Projects</h1>
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

export default ProjectsContainer;
