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
  EyeOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchAllRubrics, deleteRubric } from "../api";
import { useSelector, useDispatch } from "react-redux";
import RubricViewModal from "./../modals/RubricViewModal";

const { Text } = Typography;
const { Search } = Input;

function RubricsContainer() {
  const [searchData, setSearchData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [viewRubric, setViewRubric] = React.useState({});

  const { rubrics } = useSelector((state) => state.rubric);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    dispatch(fetchAllRubrics()).then((res) => {
      if (res.payload) {
        setSearchData(res.payload);
      }
    });
  }

  const onClose = () => {
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteRubric(id)).then((res) => {
      if (res.payload) {
        openNotificationWithIcon(
          "success",
          "Deleted",
          "Rubric Deleted Successfully"
        );
        getData();
      } else {
        openNotificationWithIcon("error", "Error", res.error.message);
      }
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
      filterIcon: (filtered) => <SearchOutlined style={{ color: "#fff" }} />,
    },
    {
      title: "Assessment",
      dataIndex: "assessment",
      key: "assessment",
      render: (text, record) => (
        <Space size="middle">
          <div>
            <div className="font-bold text-lg">{record.assessment.title}</div>
            <div>{`${record.assessment.id} - ${record.assessment.assessmentType}`}</div>
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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setViewRubric(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Delete the Rubric"
            description="Are you sure to delete this rubric?"
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
    const filteredData = rubrics.filter((record) => {
      return (
        record.id.toString().includes(value.toLowerCase()) ||
        record.assessment.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchData(filteredData);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Rubrics</h1>
        <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
        <div className="flex flex-row w-full justify-end">
          <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchData(rubrics);
              }
            }}
            style={{
              width: 400,
              borderRadius: "100%",
            }}
            allowClear
          />
          <Button onClick={() => navigate("create")} className="ml-8">
            Create Rubric
          </Button>
        </div>
        <RubricViewModal
          visible={modalVisible}
          onClose={onClose}
          rubricData={viewRubric}
        />
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

export default RubricsContainer;
