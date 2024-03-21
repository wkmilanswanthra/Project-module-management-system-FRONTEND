import React from "react";
import { Progress, Table, Avatar, Card, ConfigProvider } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Meta } = Card;

const data = [
  {
    key: "1",
    name: "John Doe",
    registrations: "ABC123",
  },
  {
    key: "2",
    name: "Jane Smith",
    registrations: "DEF456",
  },
  {
    key: "3",
    name: "Alice Johnson",
    registrations: "GHI789",
  },
  {
    key: "4",
    name: "Bob Brown",
    registrations: "JKL012",
  },
];

const tableData = [
  {
    key: "1",
    assessment: "Assignment 1",
    dueDate: "2023-10-19",
    status: "Submitted",
  },
  {
    key: "2",
    assessment: "Assignment 2",
    dueDate: "2023-10-19",
    status: "Not Submitted",
  },
  {
    key: "3",
    assessment: "Assignment 3",
    dueDate: "2023-10-19",
    status: "Submitted",
  },
  {
    key: "4",
    assessment: "Assignment 4",
    dueDate: "2023-10-19",
    status: "Not Submitted",
  },
];

const columns = [
  {
    title: "Assessment",
    dataIndex: "assessment",
    key: "assessment",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

function ProjectPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">
        Project Name
      </h1>
      <div className="text-lg font-semibold mb-4 mt-14">Project progress</div>
      <div className="mb-8 w-full flex justify-center">
        <Progress type="circle" percent={90} strokeColor={twoColors} />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Group Members</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.map((member) => (
            <Card key={member.key}>
              <Meta
                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                title={member.name}
                description={`Registration: ${member.registrations}`}
              />
            </Card>
          ))}
        </div>
      </div>
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">Submissions</h2>
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
            },
          }}
        >
          <Table columns={columns} dataSource={tableData} />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default ProjectPage;
