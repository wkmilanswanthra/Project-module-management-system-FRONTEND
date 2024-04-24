import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Typography,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Form,
  Popconfirm,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SearchOutlined,
  PlusOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Roles } from "../../../assets/constants";
import { openNotificationWithIcon } from "../../../util/notifications";
import AddFacultyModal from "../modals/AddFacultyModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFacultyMembers,
  addFacultyMember,
  updateRoles,
  deleteFacultyMember,
} from "../api";
import AddRolesModal from "../modals/AddRolesModal";
import { updateFacultyMember, resendVerificationEmail } from "../api";

const { Text } = Typography;
const { Search } = Input;

const rolesList = Object.keys(Roles).map((role) => {
  return role;
});

function FacultyContainer() {
  const [searchData, setSearchdata] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { members, loading, error } = useSelector((state) => state.faculty);
  const { user, roles } = useSelector((state) => state.auth);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [selecetedUser, setSelectedUser] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    setSearchdata(members);
  }, [members]);

  const showRolesModal = (id, roles) => {
    setSelectedId(id);
    setSelectedRoles(roles);
    setRolesModalOpen(true);
  };

  const handleOkRolesModal = () => {
    console.log(selectedId, selectedRoles);
    const mem = members.find((member) => member.id === selectedId);
    const isSupervisor = selectedRoles.includes(Roles.SUPERVISOR);
    if (
      isSupervisor &&
      (mem.position === "Lecturer" ||
        mem.position === "Assistant Lecturer" ||
        mem.position === "Instructor")
    ) {
      openNotificationWithIcon(
        "error",
        "Lecturers, Assistant Lecturers, and Instructors cannot be assigned to supervisor roles."
      );
      return;
    }
    if (!mem.isVerified) {
      openNotificationWithIcon(
        "error",
        "Unverified faculty members cannot be assigned roles."
      );
      return;
    }
    dispatch(updateRoles({ id: selectedId, roles: selectedRoles }))
      .then(() => {
        setRolesModalOpen(false);
        openNotificationWithIcon("success", "Roles chnged successfully!");
        getTableData();
      })
      .catch((e) => {
        openNotificationWithIcon("error", "Failed to update roles");
      });
  };

  const handleCancelRolesModal = () => {
    setSelectedRoles([]);
    setRolesModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteFacultyMember(id))
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Faculty Member Deleted Successfully"
        );
        getTableData();
      })
      .catch((e) => {
        openNotificationWithIcon("error", "Failed to delete faculty member");
      });
  };

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
      render: (text, record) => {
        return (
          <span>
            {record.role.map((role) => (
              <Tag className="mb-1" color="green" key={role}>
                {role}
              </Tag>
            ))}
          </span>
        );
      },
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
      title: "Email Verified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      width: "20%",
      render: (text, record) => {
        return record.isVerified ? (
          <Tag color="blue">Verified</Tag>
        ) : (
          <Tag color="red">Not Verified</Tag>
        );
      },
    },
    {
      title: "Actions",
      width: "20%",
      key: "actions",
      render: (record) => {
        return (
          <Space size="middle">
            {!record.isVerified && (
              <Button
                type="primary"
                onClick={() => {
                  dispatch(resendVerificationEmail(record.id))
                    .then(() => {
                      openNotificationWithIcon(
                        "success",
                        "Verification email sent successfully"
                      );
                    })
                    .catch(() => {
                      openNotificationWithIcon(
                        "error",
                        "Failed to send verification email"
                      );
                    });
                }}
                icon={<MailOutlined />}
              />
            )}
            <Button
              type="primary"
              onClick={() => showRolesModal(record.id, record.role)}
              icon={<PlusCircleOutlined />}
            />
            <Button
              type="primary"
              onClick={() => showEditModal(record)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the member"
              description="Are you sure to delete this faculty member?"
              onConfirm={handleDelete.bind(this, record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
      align: "center",
    },
  ];

  const getTableData = async () => {
    dispatch(getAllFacultyMembers("STAFF"))
      .then((res) => {
        res.payload = res.payload.filter((item) => item.id !== user.id);
        setSearchdata(res.payload);
      })
      .catch((e) => {
        openNotificationWithIcon(
          "error",
          "Unable to load data",
          "An error was encountered while loading data"
        );
      });
  };

  const onSearch = (value) => {
    const filteredData = members.filter((record) => {
      return (
        record.name.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase()) ||
        record.contact.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchdata(filteredData);
  };

  const showModal = () => {
    setOpen(true);
  };

  const showEditModal = (record) => {
    setOpen(true);
    setSelectedUser(record);
    setIsUpdate(true);
  };

  const handleOk = () => {
    if (!isUpdate) {
      form
        .validateFields()
        .then(async (values) => {
          values.student = false;
          setConfirmLoading(true);
          console.log("Received values of form: ", values);
          try {
            const res = await addFacultyMember(values);
            setConfirmLoading(false);
            setOpen(false);
            form.resetFields();
            openNotificationWithIcon(
              "success",
              "Faculty Member Added Successfully"
            );
            getTableData();
          } catch (e) {
            throw new Error(e);
          }
        })
        .catch((error) => {
          console.error("Validation failed:", error);
          if (!error.errorFields)
            openNotificationWithIcon("error", "Failed to add faculty member");
        });
    } else {
      form
        .validateFields()
        .then(async (values) => {
          values.student = false;
          values.id = selecetedUser.id;
          setConfirmLoading(true);
          console.log("Received values of form: ", values);
          try {
            const res = await updateFacultyMember(values);
            setConfirmLoading(false);
            setOpen(false);
            form.resetFields();
            openNotificationWithIcon(
              "success",
              "Faculty Member Updated Successfully"
            );
            getTableData();
          } catch (e) {
            throw new Error(e);
          }
        })
        .catch((error) => {
          console.error("Validation failed:", error);
          if (!error.errorFields)
            openNotificationWithIcon(
              "error",
              "Failed to update faculty member"
            );
        });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
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
          <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
          <div className="flex flex-row w-ful justify-end">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSearchdata(members);
                }
              }}
              style={{
                width: 400,
                borderRadius: "100%",
              }}
              allowClear
            />
            <Button
              onClick={showModal}
              icon={<PlusOutlined />}
              size={32}
              className="ml-8"
            >
              Add Faculty Member
            </Button>
          </div>
          <Table
            loading={loading}
            className="mt-8"
            columns={columns}
            dataSource={searchData}
            pagination={{ pageSize: 15 }}
          />
        </div>
      </ConfigProvider>
      <AddFacultyModal
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        selecetedUser={selecetedUser}
        isUpdate={isUpdate}
      />
      <AddRolesModal
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        isModalOpen={rolesModalOpen}
        handleOk={handleOkRolesModal}
        handleCancel={handleCancelRolesModal}
      />
    </>
  );
}

export default FacultyContainer;
