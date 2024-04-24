import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Space,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllStudents } from "../../students/api";
import { getAllFacultyMembers } from "../../faculty/api";
import { createNewPublication } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";
import { useNavigate } from "react-router-dom";
import fs from "fs";
import { Buffer } from "buffer";

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="Rs." style={{ width: 60 }}>
    <Option value="Rs.">Rs</Option>
    <Option value="$">$</Option>
  </Select>
);

function AddPublication() {
  const { students } = useSelector((state) => state.students);
  const { members } = useSelector((state) => state.faculty);
  const { project } = useSelector((state) => state.auth);
  const [studentSelectData, setStudentSelectData] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [acceptanceLetter, setAcceptanceLetter] = useState(null);
  const [confirmationPhoto, setConfirmationPhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllFacultyMembers());
  }, [dispatch]);

  useEffect(() => {
    setProjectId(project[0].id);
  }, [project]);

  useEffect(() => {
    const studentData = students.map((student) => {
      return {
        value: student.id,
        label: student.name,
        data: student,
      };
    });
    setStudentSelectData(studentData);
  }, [students]);

  const onFinish = (values) => {
    console.log("Received values:", values);
    console.log("Acceptance Letter", acceptanceLetter);
    console.log("Confirmation Photo", confirmationPhoto);
    const formData = new FormData();
    values.members.forEach((member) => {
      formData.append("members[]", member);
    });
    formData.append("projectId", projectId);
    formData.append("title", values.title);
    formData.append("conferenceJournal", values.conferenceJournal);
    formData.append("conferenceJournalName", values.conferenceJournalName);
    formData.append("issnNumber", values.issnNumber);
    formData.append("rankingLink", values.rankingLink);
    formData.append("scopusLink", values.scopusLink);
    formData.append("acceptanceLetterPath", acceptanceLetter);
    formData.append("confirmationPhotoPath", confirmationPhoto);
    formData.append("registrationFee", values.registrationFee);

    formData.append("supervisor", values.supervisor);
    formData.append("cosupervisor", values.cosupervisor);
    dispatch(createNewPublication(formData)).then((res) => {
      if (res.payload) {
        openNotificationWithIcon(
          "success",
          "Publication Added",
          "Publication has been added successfully"
        );
        navigate("/");
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          "Publication could not be added"
        );
      }
    });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
        Add Publication
      </h1>
      <Form
        className="w-full max-w-md md:max-w-3xl "
        onFinish={onFinish}
        layout="vertical"
        size="large"
        requiredMark={false}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Conference/Journal"
          name="conferenceJournal"
          rules={[
            { required: true, message: "Please select conference/journal!" },
          ]}
        >
          <Select>
            <Option value="conference">Conference</Option>
            <Option value="journal">Journal</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Conference/Journal Name"
          name="conferenceJournalName"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="ISSN Number" name="issnNumber">
          <Input />
        </Form.Item>

        <Form.Item
          label="Google Scholar/ Scimago Journal Ranking Link"
          name="rankingLink"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Scopus Site Link"
          name="scopusLink"
          rules={[
            {
              required: true,
              message: "Please input the Scopus Site Link!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload Acceptance Letter and Reviewer Sheet"
          name="acceptanceLetter"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Please upload the acceptance letter!" },
          ]}
        >
          <Upload
            maxCount={1}
            name="file"
            listType="picture"
            action={"http://localhost:3000/api/v1/publications/upload"}
            onChange={(info) => {
              if (info.file.xhr) {
                console.log(JSON.parse(info.file.xhr.response));
                setAcceptanceLetter(
                  JSON.parse(info.file.xhr.response).file.path
                );
              }
              if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Upload Confirmation Photo"
          name="confirmationPhoto"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload the confirmation photo!",
            },
          ]}
        >
          <Upload
            maxCount={1}
            name="file"
            listType="picture"
            action={"http://localhost:3000/api/v1/publications/upload"}
            onChange={(info) => {
              if (info.file.xhr) {
                console.log(JSON.parse(info.file.xhr.response));
                setConfirmationPhoto(
                  JSON.parse(info.file.xhr.response).file.path
                );
              }

              if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Registration Fee (LKR/USD)"
          name="registrationFee"
          rules={[
            { required: true, message: "Please input the registration fee!" },
          ]}
        >
          <InputNumber addonBefore={selectBefore} defaultValue={0} />
        </Form.Item>
        <Form.Item
          label="Select Members"
          name="members"
          rules={[
            { required: true, message: "Please select members!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value.length < 2) {
                  return Promise.reject(
                    new Error("Please select at least 2 members!")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            onChange={handleChange}
            optionLabelProp="label"
            maxLength={4}
            options={studentSelectData}
            optionRender={(option) => <Space>{option.data.label}</Space>}
          />
        </Form.Item>
        <Form.Item
          label="Supervisor"
          name="supervisor"
          dependencies={["cosupervisor"]}
          rules={[
            { required: true, message: "Please select a supervisor!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("cosupervisor") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Supervisor cannot be the same as the co-supervisor!"
                  )
                );
              },
            }),
          ]}
        >
          <Select>
            {members?.map((supervisor) => (
              <Option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Co-supervisor"
          name="cosupervisor"
          dependencies={["supervisor"]}
          rules={[
            { required: true, message: "Please select a Co-supervisor" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("supervisor") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Co supervisor cannot be the same as the supervisor!"
                  )
                );
              },
            }),
          ]}
        >
          <Select>
            {members?.map((supervisor) => (
              <Option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
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
            Add Publication
          </Button>
          <Link
            to={".."}
            className="mb-32 px-2 my-2 w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AddPublication;
