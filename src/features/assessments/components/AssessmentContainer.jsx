import React, { useEffect, useState } from "react";
import { Tabs, Button } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import AssessmentView from "./AssessmentView";
import AssessmentMarks from "./AssessmentMarks";
import { useDispatch, useSelector } from "react-redux";
import { getAssessmentById } from "../api";
import { getSubmissionByProjectId } from "../../submissions/api";
import { removeSubmission } from "../../submissions/store/submission.slice";

const { TabPane } = Tabs;

function AssessmentContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assessment = useSelector((state) => state.assessment);
  const submission = useSelector((state) => state.submission);
  const project = useSelector((state) => state.auth);

  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  // const [items, setItems] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    dispatch(getAssessmentById(id)).then((res) => {
      setX(res.payload);
    });
  }, [id]);

  useEffect(() => {
    if (project?.project) {
      dispatch(getSubmissionByProjectId(project.project.id));
    }
  }, [project?.project]);

  // useEffect(() => {
  //   if (semesters.length > 0) {
  //     const sem = semesters.find((sem) => sem.id === x?.semesterId);
  //     setAssignedSemester(sem);
  //   }
  // }, [semesters, x]);

  const operations = (
    <Button onClick={() => navigate(-1)} danger>
      Back
    </Button>
  );

  useEffect(() => {
    let x = [];
    if (submission?.submissions.length == 0) return;
    submission?.submissions?.forEach((submission) => {
      if (submission.assessmentId.id.toString() === id) {
        setY(submission);
      }
    });
  }, [submission?.submissions, id]);

  const items = [
    {
      key: "1",
      label: "Details",
      children: <AssessmentView data={x} />,
    },
  ];

  if (x?.semester?.released && y) {
    items.push({
      key: "2",
      label: "Marks",
      children: <AssessmentMarks data={y} />,
    });
  }

  return (
    <div className="flex flex-col items-start justify-start flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">
        {assessment?.assessment?.title}
      </h1>
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
