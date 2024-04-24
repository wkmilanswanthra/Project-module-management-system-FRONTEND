import React, { useEffect, useState } from "react";
import { Progress, Table, Avatar, Card, ConfigProvider, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllAssessments } from "../../assessments/api";
import { getSubmissionByProjectId } from "../../submissions/api";
import { useNavigate } from "react-router-dom";

const { Column } = Table;
const { Meta } = Card;

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

function ProjectPage() {
  const { project } = useSelector((state) => state.auth);
  const assessment = useSelector((state) => state.assessment);
  const submissions = useSelector((state) => state.submission);
  const [percent, setPercent] = useState(0);
  const [assessments, setAssessments] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
    dispatch(getAllAssessments()).then((res) => {
      setAssessments(res.payload);
    });
  }, []);

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
    dispatch(getSubmissionByProjectId(project[0].id));
  }, [project]);

  useEffect(() => {
    let z = 0;
    let y = 0;
    if (assessment.assessments && submissions?.submissions?.length > 0) {
      const x = [];
      assessment.assessments.forEach((assessment) => {
        z++;
        submissions?.submissions?.forEach((submission) => {
          if (submission.assessmentId.id === assessment.id) {
            x.push({ ...assessment, status: "Submitted" });
            y++;
          } else {
            x.push({ ...assessment, status: "Not Submitted" });
          }
        });
      });
      setAssessments(x);
    } else if (submissions?.submissions?.length === 0) {
      const x = [];
      assessment.assessments.forEach((assessment) => {
        z++;
        x.push({ ...assessment, status: "Not Submitted" });
      });
      setAssessments(x);
    }
    setPercent(((y / z) * 100).toFixed(0));
  }, [submissions.submissions, assessment.assessments]);

  const projectData = project[0];
  const { member1, member2, member3, member4 } = projectData;
  const members = [member1, member2, member3, member4];

  const columns = [
    {
      title: "Assessment",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text, record) => {
        return (
          <span>
            {new Date(text).toDateString()} -{" "}
            {new Date(text).toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "Submitted" ? "green" : "red"}>{text}</Tag>
      ),
    },
  ];

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
        <Progress type="circle" percent={percent} strokeColor={twoColors} />
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
          <Table
            loading={assessment.loading}
            columns={columns}
            dataSource={assessments}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default ProjectPage;
