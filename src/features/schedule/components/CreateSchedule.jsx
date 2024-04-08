import React from "react";
import { Link } from "react-router-dom";
import { Divider, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const Assessments = [
  {
    id: 1,
    title: "Assessment 1",
  },
  {
    id: 2,
    title: "Assessment 2",
  },
];

const Examiners = [
  {
    id: 1,
    name: "Examiner 1",
  },
  {
    id: 2,
    name: "Examiner 2",
  },
  {
    id: 3,
    name: "Examiner 3",
  },
  {
    id: 4,
    name: "Examiner 4",
  },
  {
    id: 5,
    name: "Examiner 5",
  },
];

const CreateSchedule = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
        Schedule Presentation
      </h1>
      <Divider />
      <Form
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
          name="endTtime"
          rules={[{ required: true, message: "Please select a end time!" }]}
        >
          <Input type="time" />
        </Form.Item>
        <Form.Item
          label="Assessment"
          name="assessment"
          rules={[{ required: true, message: "Please select an assessment!" }]}
        >
          <Select placeholder="Select an assessment">
            {Assessments.map((assessment) => (
              <Option key={assessment.id} value={assessment.title}>
                {assessment.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 1"
          name="examiner1"
          dependencies={["examiner2", "examiner3"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner2") !== value) &
                    (getFieldValue("examiner3") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {Examiners.map((examiner) => (
              <Option key={examiner.id} value={examiner.name}>
                {examiner.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 2"
          name="examiner2"
          dependencies={["examiner1", "examiner3"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner1") !== value) &
                    (getFieldValue("examiner3") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {Examiners.map((examiner) => (
              <Option key={examiner.id} value={examiner.name}>
                {examiner.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Examiner 3"
          name="examiner3"
          dependencies={["examiner2", "examiner1"]}
          rules={[
            { required: true, message: "Please select an examiner!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("examiner1") !== value) &
                    (getFieldValue("examiner2") !== value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Examiner can not be same!"));
              },
            }),
          ]}
        >
          <Select placeholder="Select an examiner">
            {Examiners.map((examiner) => (
              <Option key={examiner.id} value={examiner.name}>
                {examiner.name}
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
