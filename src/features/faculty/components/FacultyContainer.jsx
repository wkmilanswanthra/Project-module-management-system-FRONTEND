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
} from "@ant-design/icons";
import { Roles } from "../../../assets/constants";
import { openNotificationWithIcon } from "../../../util/notifications";
import AddFacultyModal from "../modals/AddFacultyModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllFacultyMembers, addFacultyMember } from "../api";

const { Text } = Typography;
const { Search } = Input;
const { Item } = Form;

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
    align: "center",
  },
];

function FacultyContainer() {
  const [searchData, setSearchdata] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const { members, loading, error } = useSelector((state) => state.faculty);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    setSearchdata(members);
  }, [members]);

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

  const handleOk = () => {
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
      />
    </>
  );
}

export default FacultyContainer;
