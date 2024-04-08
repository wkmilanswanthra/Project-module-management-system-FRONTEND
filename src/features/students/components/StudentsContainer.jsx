import React, { useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  ConfigProvider,
  Divider,
  Input,
  Popconfirm,
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
import { getAllStudents, deleteStudent } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../../util/notifications";
import UpdateStudentModal from "../modals/UpdateStudentModal";

const { Text } = Typography;
const { Search } = Input;

function StudentsContainer() {
  const [searchData, setSearchdata] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [updateStudentModalOpen, setUpdateStudentModalOpen] =
    React.useState(false);

  const { students, loading, error } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStudents();
  }, []);

  const updateStudentModal = (student) => {
    setSelectedStudent(student);
    setUpdateStudentModalOpen(true);
  };

  const updateStudentHandleOk = () => {
    setUpdateStudentModalOpen(false);
    setSelectedStudent(null);
  };

  const updateStudentHandleCancel = () => {
    setUpdateStudentModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id))
      .then(() => {
        openNotificationWithIcon("success", "Success", "Student deleted");
        fetchStudents();
      })
      .catch(() => {
        openNotificationWithIcon("error", "Error", "Failed to delete student");
      });
  };

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
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Student",
          value: "STUDENT",
        },
        {
          text: "Leader",
          value: "PROJECT_LEADER",
        },
      ],
      onFilter: (value, record) => record.role === value,
      filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
    },
    {
      title: "User Created on",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (text, record) => (
        <Text>
          {new Date(record.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      ),
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
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => updateStudentModal(record)}
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Delete the student"
            description="Are you sure to delete this student?"
            onConfirm={handleDelete.bind(this, record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      align: "center",
    },
  ];

  const fetchStudents = async () => {
    dispatch(getAllStudents())
      .then((res) => {
        setSearchdata(res.payload);
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Error", "Failed to fetch students");
      });
  };

  const onSearch = (value) => {
    const filteredData = students.filter((record) => {
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
                setSearchdata(students);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
        </div>
        <UpdateStudentModal
          student={selectedStudent}
          open={updateStudentModalOpen}
          handleOk={updateStudentHandleOk}
          handleCancel={updateStudentHandleCancel}
        />
        <Table
          loading={loading}
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
