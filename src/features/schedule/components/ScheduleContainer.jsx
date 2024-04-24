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
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllSchedules, deleteSchedule } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;

function ScheduleContainer() {
  const [searchData, setSearchData] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schedules = useSelector((state) => state.schedule);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(getAllSchedules()).then((res) => {
      setSearchData(res.payload);
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteSchedule(id)).then((res) => {
      if (res.payload) {
        openNotificationWithIcon(
          "success",
          "Deleted!",
          "Schedule deleted successfully"
        );
        getData();
      } else {
        openNotificationWithIcon(
          "error",
          "Error!",
          "Failed to delete schedule"
        );
      }
    });
  };

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
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      sorter: (a, b) => a.startTime.localeCompare(b.startTime),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      sorter: (a, b) => a.endTime.localeCompare(b.endTime),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Assessment Title",
      dataIndex: "assessment",
      key: "assessment",
      render: (text, record) => <Text>{record.assessment.title}</Text>,
      sorter: (a, b) => a.assessment.title.localeCompare(b.assessment.title),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
    },
    {
      title: "Project Group",
      dataIndex: "project",
      key: "project",
      render: (text, record) => <Text>{record.project.title}</Text>,
      sorter: (a, b) => a.project.title.localeCompare(b.project.title),
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
      render: (text, record) => (
        <Text>{record.examiner1 ? record.examiner1.name : ""}</Text>
      ),
      sorter: (a, b) => a.examiner1.name.localeCompare(b.examiner1.name),
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
      render: (text, record) => (
        <Text>{record.examiner2 ? record.examiner2.name : ""}</Text>
      ),
      sorter: (a, b) => a.examiner2.name.localeCompare(b.examiner2.name),
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
      render: (text, record) => (
        <Text>{record.examiner3 ? record.examiner3.name : ""}</Text>
      ),
      sorter: (a, b) => a.examiner3.name.localeCompare(b.examiner3.name),
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
            onClick={() => navigate(`edit/${record.id}`)}
            type="primary"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Delete the scheduled item?"
            description="Are you sure to delete this scheduled item?"
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

  const onSearch = (value) => {
    const filteredData = searchData.filter((record) => {
      return (
        record.date.toLowerCase().includes(value.toLowerCase()) ||
        record.assessment.title.toLowerCase().includes(value.toLowerCase()) ||
        record.project.title.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner1.name.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner2.name.toLowerCase().includes(value.toLowerCase()) ||
        record.examiner3.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchData(filteredData);
  };

  const reset = (e) => {
    if (!e || e.target.value === "") {
      setSearchData(schedules.schedules);
    }
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
            onChange={reset}
          />
        </div>
        <Table
          loading={schedules.loading}
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
