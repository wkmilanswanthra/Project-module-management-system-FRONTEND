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
  PlusOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments, deleteAssessment } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";

const { Text } = Typography;
const { Search } = Input;

function AssessmentContainer() {
  const [searchData, setSearchData] = React.useState([]);
  const { assessments, error, loading } = useSelector(
    (state) => state.assessment
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllAssessments();
  }, []);

  const fetchAllAssessments = () => {
    dispatch(getAllAssessments())
      .then((res) => {
        if (res.error) throw new Error(res.error);
        setSearchData(res.payload);
      })
      .catch((e) => {
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to fetch assessments"
        );
      });
  };

  const onSearch = (value) => {
    const filteredData = assessments.filter((record) => {
      return (
        record.title.toLowerCase().includes(value.toLowerCase()) ||
        record.description.toLowerCase().includes(value.toLowerCase()) ||
        record.assessmentType.toLowerCase().includes(value.toLowerCase()) ||
        record.semester.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchData(filteredData);
  };

  const handleDelete = (id) => {
    dispatch(deleteAssessment(id))
      .then(() => {
        openNotificationWithIcon("success", "Success", "Assessment deleted");
        fetchAllAssessments();
      })
      .catch(() => {
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to delete assessment"
        );
      });
  };

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
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.title),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
    },
    {
      title: "Assessment Type",
      dataIndex: "assessmentType",
      key: "assessmentType",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      render: (text, record) => <Text>{record.semester?.name}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate(`edit?id=${record.id}`)}
            type="primary"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Delete the member"
            description="Are you sure to delete this faculty member?"
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
          Assessments
        </h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData(assessments);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
          <Button onClick={() => navigate("create")} className="ml-8">
            Create Assessment
          </Button>
        </div>
        <Table
          className="mt-8"
          columns={columns}
          dataSource={searchData}
          pagination={{ pageSize: 15 }}
          loading={loading}
        />
      </div>
    </ConfigProvider>
  );
}

export default AssessmentContainer;
