import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Select, Button, Spin } from "antd";
import { updateAssessment } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "../../../util/notifications";
import { getAssessmentById } from "../api";
import moment from "moment";

const { Option } = Select;

const EditAssessmentContainer = () => {
  const { assessment, loading, error } = useSelector(
    (state) => state.assessment
  );
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    getAssessmentData();
  }, []);

  const getAssessmentData = async () => {
    dispatch(getAssessmentById(id))
      .then((res) => {
        console.log(res);
        if (res.error) throw new Error(res.payload.error);

        form.setFieldsValue({
          title: res.payload.title,
          description: res.payload.description,
          assessmentType: res.payload.assessmentType,
          semester: res.payload.semester.id.toString(),
          dueDate: moment(res.payload.dueDate).format("YYYY-MM-DDTHH:mm"),
        });
        console.log(moment(res.payload.dueDate).format("YYYY-MM-DDTHH:mm"));
      })
      .catch((err) => {
        console.log("Failed to fetch assessment", err);
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to fetch assessment"
        );
      });
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(updateAssessment({ id: id, values: values }))
      .then((res) => {
        if (res.payload.error) throw new Error(res.payload.error);
        openNotificationWithIcon("success", "Success", "Assessment updated");
        navigate("/assessments");
      })
      .catch((err) => {
        console.log("Failed to update assessment", err);
        openNotificationWithIcon(
          "error",
          "Error",
          "Failed to update assessment"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Update Assessment
        </h1>
        <Form
          disabled={loading}
          form={form}
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <div className="col-span-2">
            <Form.Item
              label="Assessment Title"
              name="title"
              rules={[
                { required: true, message: "Please enter assessment title" },
              ]}
            >
              <Input placeholder="Enter assessment title" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>
            <Form.Item
              label="Assessment Type"
              name="assessmentType"
              rules={[
                { required: true, message: "Please select assessment type" },
              ]}
            >
              <Select disabled={true} placeholder="Select assessment type">
                <Option value="Presentation">Presentation</Option>
                <Option value="Report">Report</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Semester"
              name="semester"
              rules={[{ required: true, message: "Please select a semester" }]}
            >
              <Select placeholder="Select semester">
                <Option value="1">Semester 1</Option>
                <Option value="2">Semester 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Due Date and Time"
              name="dueDate"
              rules={[
                { required: true, message: "Please select due date and time" },
              ]}
            >
              <Input type="datetime-local" />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-2 w-full items-center mb-40">
            <Button
              type="primary"
              htmlType="submit"
              className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              {loading ? <Spin className="text-white" /> : "Update"}
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
    </div>
  );
};

export default EditAssessmentContainer;
