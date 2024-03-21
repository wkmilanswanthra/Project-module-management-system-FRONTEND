import React from "react";
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

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="Rs." style={{ width: 60 }}>
    <Option value="Rs.">Rs</Option>
    <Option value="$">$</Option>
  </Select>
);

const students = [
  {
    id: 1,
    name: "John Doe",
    value: "John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
    value: "Jane Smith",
  },
  {
    id: 3,
    name: "Michael Johnson",
    value: "Michael Johnson",
  },
  {
    id: 4,
    name: "Emily Davis",
    value: "Emily Davis",
  },
];

const supervisors = [
  {
    id: 1,
    name: "Dr. John Doe",
    value: "Dr. John Doe",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    value: "Dr. Jane Smith",
  },
  {
    id: 3,
    name: "Dr. Michael Johnson",
    value: "Dr. Michael Johnson",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    value: "Dr. Emily Davis",
  },
];

function AddPublication() {
  const onFinish = (values) => {
    console.log("Received values:", values);
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
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Upload Confirmation Photo"
          name="confirmationPhoto"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
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
        <Form.Item label="Select Members" name="members">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            onChange={handleChange}
            optionLabelProp="label"
            options={students}
            optionRender={(option) => <Space>{option.data.name}</Space>}
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
            {supervisors.map((supervisor) => (
              <Option key={supervisor.id} value={supervisor.value}>
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
            {supervisors.map((supervisor) => (
              <Option key={supervisor.id} value={supervisor.value}>
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
            Schedule Presentation
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
