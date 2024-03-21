import React from "react";
import { Divider, List, Typography, Tag, Card } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const loading = false;

const data = [
  {
    id: 1,
    title: "Assessment 1",
    description: "Description for Assessment 1",
    dueDate: "2024-03-25",
    type: "Presentation",
    submitted: true,
  },
  {
    id: 2,
    title: "Assessment 2",
    description: "Description for Assessment 2",
    dueDate: "2024-04-05",
    type: "Report",
    submitted: false,
  },
  {
    id: 3,
    title: "Assessment 3",
    description: "Description for Assessment 3",
    dueDate: "2024-04-15",
    type: "Report",
    submitted: true,
  },
  {
    id: 4,
    title: "Assessment 4",
    description: "Description for Assessment 4",
    dueDate: "2024-04-25",
    type: "Presentation",
    submitted: false,
  },
];

function AssessmentList() {
  return (
    <div className="flex flex-col  flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">
        Assessment List
      </h1>
      <Divider style={{ width: "100%" }} />
      <List
        itemLayout="horizontal"
        dataSource={data}
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
                <Text type="secondary">Due: {item.dueDate}</Text>
                <Tag color={item.submitted ? "green" : "volcano"}>
                  {item.submitted ? "Submitted" : "Not Submitted"}
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
