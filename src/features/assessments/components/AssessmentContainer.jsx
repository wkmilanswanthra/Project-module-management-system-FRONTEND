import React from "react";
import { Tabs, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AssessmentView from "./AssessmentView";
import AssessmentMarks from "./AssessmentMarks";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;

function AssessmentContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const operations = (
    <Button onClick={() => navigate(-1)} danger>
      Back
    </Button>
  );

  const items = [
    {
      key: "1",
      label: "Information",
      children: <AssessmentView />,
    },
    {
      key: "2",
      label: "Marks",
      children: <AssessmentMarks />,
    },
  ];
  return (
    <div className="flex flex-col items-start justify-start flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">Assessment</h1>
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        className="w-full"
        type="card"
        items={items}
      />
    </div>
  );
}

export default AssessmentContainer;
