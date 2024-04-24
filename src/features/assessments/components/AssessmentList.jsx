import React, { useEffect, useState } from "react";
import { Divider, List, Typography, Tag, Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllAssessments } from "../api";
import { getSubmissionByProjectId } from "../../submissions/api";
import { getMe } from "../../auth/api";

const { Title, Text } = Typography;
const loading = false;

function AssessmentList() {
  const { project } = useSelector((state) => state.auth);
  const assessment = useSelector((state) => state.assessment);
  const submissions = useSelector((state) => state.submission);
  const [assessments, setAssessments] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      assessment?.assessments?.length > 0 &&
      submissions?.submissions?.length > 0
    ) {
      const x = [];
      assessment.assessments.forEach((assessment) => {
        submissions?.submissions?.forEach((submission) => {
          if (submission.assessmentId.id === assessment.id) {
            x.push({ ...assessment, status: true });
          } else {
            x.push({ ...assessment, status: false });
          }
        });
      });
      setAssessments(x);
    } else {
      dispatch(getAllAssessments()).then((res) => {
        setAssessments(res.payload);
      });
      if (project) dispatch(getSubmissionByProjectId(project[0]?.id));
    }
  }, [project]);

  return (
    <div className="flex flex-col  flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">
        Assessment List
      </h1>
      <Divider style={{ width: "100%" }} />
      <List
        itemLayout="horizontal"
        dataSource={assessments}
        renderItem={(item) => (
          <Link to={`/assessment/${item.id}`}>
            <Card
              loading={loading}
              hoverable
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              <Title level={3}>{item.title}</Title>
              <div>{item.type}</div>
              <Text type="secondary">{item.description}</Text>
              <div className="flex justify-between items-center mt-4">
                <Text type="secondary">
                  Due: {new Date(item.dueDate).toDateString()} -{" "}
                  {new Date(item.dueDate).toLocaleTimeString()}
                </Text>
                <Tag color={item.status ? "green" : "volcano"}>
                  {item.status ? "Submitted" : "Not Submitted"}
                </Tag>
              </div>
            </Card>
          </Link>
        )}
      />
    </div>
  );
}

export default AssessmentList;
