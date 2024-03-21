import React from "react";
import { Divider, Table, Input, Form, ConfigProvider, Button } from "antd";
import { openNotificationWithIcon } from "../../../util/notifications";

const { TextArea } = Input;

const rubric = [
  {
    key: "1",
    criteria: "Criteria 1",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "2",
    criteria: "Criteria 2",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "3",
    criteria: "Criteria 3",
    description: "description",
    weightage: 10,
    marks: 10,
  },
  {
    key: "4",
    criteria: "Criteria 4",
    description: "description",
    weightage: 10,
    marks: 10,
  },
];

const students = [
  {
    id: "1",
    name: "student1",
  },
  {
    id: "2",
    name: "student2",
  },
  {
    id: "3",
    name: "student3",
  },
  {
    id: "4",
    name: "student4",
  },
];

const columns = [
  {
    title: "Criteria",
    dataIndex: "criteria",
    key: "criteria",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <TextArea rows={2} value={text} readOnly />,
  },
  {
    title: "Weightage",
    dataIndex: "weightage",
    key: "weightage",
    width: 150,
    align: "center",
  },
  {
    title: "Marks",
    dataIndex: "marks",
    key: "marks",
    width: 150,
    align: "center",
  },
  {
    title: "Student 1",
    dataIndex: "student1",
    key: "student1",
    render: (text, record, index) => (
      <Form.Item
        name={"Student1" + record.key}
        key={index}
        rules={[{ required: true, message: "Marks are required!" }]}
      >
        <Input
          type="number"
          max={record.marks}
          min={0}
          placeholder="Enter marks"
        />
      </Form.Item>
    ),
    width: 150,
  },
  {
    title: "Student 2",
    dataIndex: "student2",
    key: "student2",
    render: (text, record, index) => (
      <Form.Item
        name={"Student2" + record.key}
        key={index}
        rules={[{ required: true, message: "Marks are required!" }]}
      >
        <Input
          max={record.marks}
          min={0}
          type="number"
          placeholder="Enter marks"
        />
      </Form.Item>
    ),
    width: 150,
  },
  {
    title: "Student 3",
    dataIndex: "student3",
    key: "student3",
    render: (text, record, index) => (
      <Form.Item
        name={"Student3" + record.key}
        key={index}
        rules={[{ required: true, message: "Marks are required!" }]}
      >
        <Input
          max={record.marks}
          min={0}
          type="number"
          placeholder="Enter marks"
        />
      </Form.Item>
    ),
    width: 150,
  },
  {
    title: "Student 4",
    dataIndex: "student4",
    key: "student4",
    render: (text, record, index) => (
      <Form.Item
        name={"Student4" + record.key}
        key={index}
        rules={[{ required: true, message: "Marks are required!" }]}
      >
        <Input
          max={record.marks}
          min={0}
          type="number"
          placeholder="Enter marks"
        />
      </Form.Item>
    ),
    width: 150,
  },
];

const NewMarksheet = () => {
  const form = React.useRef();

  const onFinish = (values) => {
    console.log("Form values:", values);
    openNotificationWithIcon("success", "Marksheet submitted successfully!");
    form.current.resetFields();
  };

  return (
    <div className="flex flex-col items-start justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-10">Marksheet</h1>
      <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Group Name:</h2>
        <p className="text-gray-700">Optimus (GRP003)</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Assessment Title:
        </h2>
        <p className="text-gray-700">Sample Assessment</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Description:</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <Form ref={form} className="w-full" onFinish={onFinish}>
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
              Button: {
                primaryColor: "#444",
                primaryBg: "#fff",
                dangerColor: "#FF3200",
              },
            },
          }}
        >
          <Table
            dataSource={rubric}
            columns={columns}
            pagination={false}
            bordered
            className="w-full"
          />{" "}
        </ConfigProvider>
        <div className="mt-12 w-full">
          <h2 className="text-xl font-semibold text-gray-900">Comments:</h2>
          <Form.Item name="comments">
            <TextArea rows={4} className="md:w-[40%]" />
          </Form.Item>
        </div>
        <div className="mt-6 mb-20 w-full flex justify-end">
          <Button
            htmlType="submit"
            className="mr-10 px-8 h-10 bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMarksheet;
