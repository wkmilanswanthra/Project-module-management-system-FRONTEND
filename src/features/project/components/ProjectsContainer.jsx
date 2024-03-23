import React, { useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  ConfigProvider,
  Divider,
  Input,
  Card,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { getAllProjects } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../../util/notifications";
import { renderRow } from "../table/ExpandRow";

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
    render: (text, record) => <Text>{record.supervisor.name}</Text>,
  },
  {
    title: "Co-supervisor",
    dataIndex: "coSupervisor",
    key: "coSupervisor",
    render: (text, record) => <Text>{record.coSupervisor.name}</Text>,
  },
  {
    title: "Member 1 (Leader)",
    dataIndex: "member1",
    key: "member1",
    render: (text, record) => <Text>{record.member1.name}</Text>,
  },
  {
    title: "Member 2",
    dataIndex: "member2",
    key: "member2",
    render: (text, record) => <Text>{record.member2.name}</Text>,
  },
  {
    title: "Member 3",
    dataIndex: "member3",
    key: "member3",
    render: (text, record) => <Text>{record.member3.name}</Text>,
  },
  {
    title: "Member 4",
    dataIndex: "member4",
    key: "member4",
    render: (text, record) => <Text>{record.member4.name}</Text>,
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space size="middle">
        <Button type="primary" icon={<EyeOutlined />} />
        <Button type="danger" icon={<DeleteOutlined />} />
      </Space>
    ),
    align: "center",
  },
];

function ProjectsContainer() {
  const [searchData, setSearchdata] = React.useState([]);
  const { projects, loading, error } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = () => {
    dispatch(getAllProjects())
      .then((res) => {
        setSearchdata(res.payload);
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Error", "Failed to fetch projects");
        console.log(err);
      });
  };

  const onSearch = (value) => {
    const filteredData = projects.filter((record) => {
      const searchTerm = value.toLowerCase();
      const supervisor = record.supervisor
        ? record.supervisor.name.toLowerCase()
        : "";
      const coSupervisor = record.coSupervisor
        ? record.coSupervisor.name.toLowerCase()
        : "";
      const member1 = record.member1 ? record.member1.name.toLowerCase() : "";
      const member2 = record.member2 ? record.member2.name.toLowerCase() : "";
      const member3 = record.member3 ? record.member3.name.toLowerCase() : "";
      const member4 = record.member4 ? record.member4.name.toLowerCase() : "";
      const registrationNumbers = [
        record.member1?.registrationNumber,
        record.member2?.registrationNumber,
        record.member3?.registrationNumber,
        record.member4?.registrationNumber,
      ].map((regNum) => (regNum ? regNum.toLowerCase() : ""));
      const contactNumbers = [
        record.supervisor?.contact,
        record.coSupervisor?.contact,
        record.member1?.contact,
        record.member2?.contact,
        record.member3?.contact,
        record.member4?.contact,
      ].map((contact) => (contact ? contact.toLowerCase() : ""));
      const specializations = [
        record.member1?.specialization,
        record.member2?.specialization,
        record.member3?.specialization,
        record.member4?.specialization,
      ].map((spec) => (spec ? spec.toLowerCase() : ""));

      return (
        record.title.toLowerCase().includes(searchTerm) ||
        record.researchGroup.toLowerCase().includes(searchTerm) ||
        supervisor.includes(searchTerm) ||
        coSupervisor.includes(searchTerm) ||
        member1.includes(searchTerm) ||
        member2.includes(searchTerm) ||
        member3.includes(searchTerm) ||
        member4.includes(searchTerm) ||
        registrationNumbers.some((regNum) => regNum.includes(searchTerm)) ||
        contactNumbers.some((contact) => contact.includes(searchTerm)) ||
        specializations.includes(searchTerm)
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
            rowExpandedBg: "#aaa",
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
                setSearchdata(projects);
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
          loading={loading}
          className="mt-8"
          columns={columns}
          dataSource={searchData}
          pagination={{ pageSize: 15 }}
          expandable={{
            expandedRowRender: (record) => renderRow(record),
          }}
        />
      </div>
    </ConfigProvider>
  );
}

export default ProjectsContainer;
