import React from "react";
import { Progress, Table, Avatar, Card, ConfigProvider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Column } = Table;
const { Meta } = Card;

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
  const { project } = useSelector((state) => state.auth);

  if (!project) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">
          Project Not Found
        </h1>
      </div>
    );
  }

  const projectData = project[0];
  const { member1, member2, member3, member4 } = projectData;
  const members = [member1, member2, member3, member4];

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">
        {projectData.title}
      </h1>
      <div className="w-full flex justify-between mt-16">
        <div className="mb-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Research Group</h2>
          <p>{projectData.researchGroup}</p>
        </div>
        <div className="mb-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Research Area</h2>
          <p>{projectData.researchArea}</p>
        </div>
      </div>
      <div className="text-lg font-semibold mb-4 mt-6">Project progress</div>
      <div className="mb-8 ">
        <Progress type="circle" percent={90} strokeColor={twoColors} />
      </div>
      <div className="w-full flex mt-16">
        <div className="mb-8  flex-1">
          <h2 className="text-2xl font-semibold mb-4">Project Supervisor</h2>
          <Card className="ml-10 md:w-[450px]">
            <Meta
              avatar={<Avatar size={64} icon={<UserOutlined />} />}
              title={projectData.supervisor.name}
              description={`Position: ${projectData.supervisor.position}`}
            />
          </Card>
        </div>
        <div className="mb-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Project Co-Supervisor</h2>
          <Card className="ml-10 md:w-[450px]">
            <Meta
              avatar={<Avatar size={64} icon={<UserOutlined />} />}
              title={projectData.coSupervisor.name}
              description={`Position: ${projectData.coSupervisor.position}`}
            />
          </Card>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-16">Group Members</h2>
        <div className="grid grid-cols-2 gap-4">
          {members.map((member, index) => (
            <Card key={index}>
              <Meta
                avatar={<Avatar size={64} icon={<UserOutlined />} />}
                title={member.name}
                description={`Registration: ${member.registrationNumber}`}
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
