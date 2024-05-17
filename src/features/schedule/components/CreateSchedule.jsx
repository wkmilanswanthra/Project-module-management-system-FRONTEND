import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Divider, Form, Input, Select, Button } from "antd";
import { getAllFacultyMembers } from "../../faculty/api/index.jsx";
import { getAllAssessments } from "./../../assessments/api/index";
import { useDispatch, useSelector } from "react-redux";
import {
  createSchedule,
  updateSchedule,
  getScheduleById,
} from "../api/index.jsx";
import { openNotificationWithIcon } from "../../../util/notifications.jsx";
import { getAllProjects } from "../../project/api/index.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "antd";

const { Option } = Select;

const CreateSchedule = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [assessmentsList, setAssessmentsList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const { members } = useSelector((state) => state.faculty);
  const { assessments } = useSelector((state) => state.assessment);
  const { projects } = useSelector((state) => state.project);
  const { schedule } = useSelector((state) => state.schedule);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllFacultyMembers());

    dispatch(getAllAssessments());

    dispatch(getAllProjects());
    if (id) {
      setIsUpdate(true);
      dispatch(getScheduleById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (schedule) {
      const {
        date,
        location,
        startTime,
        endTime,
        assessmentId,
        projectId,
        examiner1Id,
        examiner2Id,
        examiner3Id,
      } = schedule;
      form.setFieldsValue({
        date,
        location,
        startTime,
        endTime,
        assessmentId,
        projectId,
        examiner1Id,
        examiner2Id,
        examiner3Id,
      });
    }
  }, [schedule]);
  useEffect(() => {
    if (assessments.length > 0) {
      const x = assessments.filter((assessment) => {
        if (assessment?.assessmentType === "Presentation") {
          return {
            id: assessment?.id,
            title: assessment?.title,
          };
        }
      });
      setAssessmentsList(x);
    }
  }, [assessments]);

  useEffect(() => {
    if (members.length > 0) {
      const x = members.filter((member) => {
        if (member?.role.includes("EXAMINER")) {
          return {
            id: member?.id,
            name: member?.name,
          };
        }
      });
      setFacultyMembers(x);
    }
  }, [members]);

  useEffect(() => {
    if (projects.length > 0) {
      const x = projects.filter((project) => {
        return {
          id: project?.id,
          title: project?.title,
        };
      });
      setProjectList(x);
    }
  }, [projects]);

  const onFinish = (values) => {
    console.log("Form values:", values);
    values.id = id;
    if (isUpdate) {
      dispatch(updateSchedule(values))
        .then((res) => {
          if (!res.error) {
            openNotificationWithIcon(
              "success",
              "Done",
              "Schedule updated successfully"
            );
            navigate("/schedule");
          } else {
            openNotificationWithIcon("error", "Error", res.error.message);
            console.log(res.error);
          }
        })
        .catch((error) => {
          openNotificationWithIcon("error", "Error", error.message);
        });
      return;
    }
    dispatch(createSchedule(values))
      .then((res) => {
        if (!res.error) {
          openNotificationWithIcon(
            "success",
            "Done",
            "Schedule created successfully"
          );
          navigate("/schedule");
        } else {
          openNotificationWithIcon("error", "Error", res.payload);
          console.log(res.error);
        }
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Error", error.message);
      });
  };

  const validateEndTime = (rule, value) => {
    const startTime = form.getFieldValue("startTime");
    if (startTime && value && value <= startTime) {
      return Promise.reject("End time must be after start time!");
    }
    return Promise.resolve();
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
        Schedule Presentation
      </h1>
      <Divider />
      <Form
        form={form}
        name="scheduleForm"
        onFinish={onFinish}
        className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
        layout="vertical"
        size="large"
        requiredMark={false}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please select location!" }]}
        >
          <Select placeholder="Select an location">
            <Option value={"Hall A"}>Hall A</Option>
            <Option value={"Hall B"}>Hall B</Option>
            <Option value={"Hall C"}>Hall C</Option>
            <Option value={"Hall D"}>Hall D</Option>
            <Option value={"Hall E"}>Hall E</Option>
            <Option value={"Hall F"}>Hall F</Option>
            <Option value={"Hall G"}>Hall G</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select a start time!" }]}
        >
          <Input type="time" />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[
            { required: true, message: "Please select a end time!" },
            { validator: validateEndTime },
          ]}
        >
          <Input type="time" />
        </Form.Item>
        <Form.Item
          label="Assessment"
          name="assessmentId"
          rules={[{ required: true, message: "Please select an assessment!" }]}
        >
          <Select placeholder="Select an assessment">
            {assessmentsList?.map((assessment) => (
              <Option key={assessment?.id} value={assessment?.id}>
                {assessment?.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Project Group"
          name="projectId"
          rules={[
            { required: true, message: "Please select a project group!" },
          ]}
        >
          <Select placeholder="Select a project group">
            {projectList?.map((project) => (
              <Option key={project?.id} value={project?.id}>
                {project?.title} - {project?.id}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 1"
          name="examiner1Id"
          dependencies={["examiner2", "examiner3"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner2Id") !== value) &
                    (getFieldValue("examiner3Id") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {facultyMembers.map((examiner) => (
              <Option key={examiner?.id} value={examiner?.id}>
                {examiner?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 2"
          name="examiner2Id"
          dependencies={["examiner1", "examiner3"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner1Id") !== value) &
                    (getFieldValue("examiner3Id") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {facultyMembers.map((examiner) => (
              <Option key={examiner?.id} value={examiner?.id}>
                {examiner?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 3"
          name="examiner3Id"
          dependencies={["examiner2", "examiner1"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner1Id") !== value) &
                    (getFieldValue("examiner2Id") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {facultyMembers.map((examiner) => (
              <Option key={examiner?.id} value={examiner?.id}>
                {examiner?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="col-span-2 flex flex-col items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="px-2 my-2 min-w-[50%] w-[50%] h-12 bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          >
            Schedule Presentation
          </Button>
          <Link
            to={".."}
            className="px-2 my-2 w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default CreateSchedule;
