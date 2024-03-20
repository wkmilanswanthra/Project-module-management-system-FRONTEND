import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const supervisors = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

const mem = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "John Doe1",
  },
  {
    id: 4,
    name: "Jane Doe1",
  },
];

const CreateProject = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex  flex-col items-center justify-center flex-1">
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100px",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Create Project
        </h1>
        <Form
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <div className="col-span-2">
            <Form.Item
              label="Project Title"
              name="projectTitle"
              rules={[
                { required: true, message: "Please enter project title" },
              ]}
            >
              <Input placeholder="Enter project title" />
            </Form.Item>
            <Form.Item
              label="Research Area"
              name="researchArea"
              rules={[
                { required: true, message: "Please enter research area" },
              ]}
            >
              <Input placeholder="Enter research area" />
            </Form.Item>
            <Form.Item
              label="Research Group"
              name="researchGroup"
              rules={[
                { required: true, message: "Please select research group" },
              ]}
            >
              <Select placeholder="Select research group">
                <Option value="Machine Learning">Machine Learning</Option>
                <Option value="Natural Language Processing">
                  Natural Language Processing
                </Option>
                <Option value="Intelligent Systems">Intelligent Systems</Option>
                <Option value="Robotics">Robotics</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Supervisors"
              name="supervisors"
              rules={[{ required: true, message: "Please select supervisor" }]}
            >
              <Select placeholder="Select supervisor">
                {supervisors.map((supervisor) => (
                  <Option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Co-Supervisors"
              name="coSupervisors"
              rules={[
                { required: true, message: "Please select co-supervisor" },
              ]}
            >
              <Select placeholder="Select co-supervisor">
                {supervisors.map((supervisor) => (
                  <Option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div
              label="Group Members"
              name="groupMembers"
              rules={[
                { required: true, message: "Please select group members" },
              ]}
            >
              <div className="relative grid grid-cols-2 gap-1 mt-8">
                <Form.Item label="Leader" name="leader">
                  <Select disabled={true} placeholder="Me"></Select>
                </Form.Item>
                <Form.Item
                  label="Member 1"
                  name="member1"
                  rules={[
                    { required: true, message: "Please select a member" },
                  ]}
                >
                  <Select placeholder="Select member 1">
                    {mem.map((member) => (
                      <Option key={member.id} value={member.id}>
                        {member.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Member 2"
                  name="member2"
                  rules={[
                    { required: true, message: "Please select a member" },
                  ]}
                >
                  <Select placeholder="Select member 2">
                    {mem.map((member) => (
                      <Option key={member.id} value={member.id}>
                        {member.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Member 3"
                  name="member3"
                  rules={[
                    { required: true, message: "Please select a member" },
                  ]}
                >
                  <Select placeholder="Select member 3">
                    {mem.map((member) => (
                      <Option key={member.id} value={member.id}>
                        {member.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 w-full items-center">
            <Button
              htmlType="submit"
              className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              Create Project
            </Button>
            <Link
              to={"/"}
              className="px-2 my-2  w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
