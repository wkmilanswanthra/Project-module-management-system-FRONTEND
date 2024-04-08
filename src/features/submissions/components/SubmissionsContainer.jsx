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
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllSubmissions } from "./../api/index";
import { openNotificationWithIcon } from "../../../util/notifications";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { Search } = Input;

function SubmissionsContainer() {
  const [searchData, setSearchData] = React.useState([]);
  const { submissions, loading, error } = useSelector((state) => state.faculty);

  const dispatch = useDispatch();

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    dispatch(fetchAllSubmissions())
      .then((res) => {
        if (res.payload) {
          setSearchData(res.payload);
        } else if (res.payload.length === 0) {
          openNotificationWithIcon();
        }
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Error", error.message);
      });
  };

  const onSearch = (value) => {
    const filteredData = submissions.filter((record) => {
      return (
        record.id.toLowerCase().includes(value.toLowerCase()) ||
        record.projectId.title.toLowerCase().includes(value.toLowerCase()) ||
        record.assessmentId.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchData(filteredData);
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: "Submission ID",
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
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName.localeCompare(b.assessmentTitle),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
      render: (text, record) => <Text>{record?.projectId?.title}</Text>,
    },
    {
      title: "Assessment title",
      dataIndex: "assessmentTitle",
      key: "assessmentTitle",
      sorter: (a, b) => a.assessmentTitle.localeCompare(b.assessmentTitle),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
      render: (text, record) => (
        <Text>{`${record?.assessmentId?.title} - ${record?.assessmentId?.assessmentType}`}</Text>
      ),
    },
    {
      title: "Date of Submission",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
      sorter: (a, b) => a.dateSubmitted.localeCompare(b.dateSubmitted),
      sortIcon: ({ sortOrder }) =>
        sortOrder === "ascend" ? (
          <SortAscendingOutlined />
        ) : (
          <SortDescendingOutlined />
        ),
      render: (text, record) => (
        <Text>{`${new Date(
          record?.dateSubmitted
        ).toLocaleDateString()} - ${new Date(
          record?.dateSubmitted
        ).toLocaleTimeString()}`}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />} />
          <Button
            type="primary"
            onClick={() => navigate(`/marks/new/${record.id}`)}
            icon={<EditOutlined />}
          />
          <Button type="danger" icon={<DeleteOutlined />} />
        </Space>
      ),
      width: "20%",
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
          Submissions
        </h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData(submissions);
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
        />
      </div>
    </ConfigProvider>
  );
}

export default SubmissionsContainer;
