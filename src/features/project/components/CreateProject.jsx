import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../api";
import { getAllFacultyMembers } from "./../../faculty/api/index";
import { getAllStudents } from "../../students/api";
import { openNotificationWithIcon } from "./../../../util/notifications";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProject = () => {
  const { members } = useSelector((state) => state.faculty);
  const { loading, error } = useSelector((state) => state.project);
  const { students } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllFacultyMembers());
    dispatch(getAllStudents());
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    if (!user.isVerified) {
      openNotificationWithIcon(
        "error",
        "Error",
        "Please verify your email to create a project"
      );
      return;
    }
    values.member1Id = user.id;
    dispatch(createProject(values)).then((res) => {
      if (!res.error) {
        openNotificationWithIcon(
          "success",
          "Project Created",
          "Project has been created successfully"
        );
        navigate("/");
      } else {
        openNotificationWithIcon("error", "Error", res.payload.message);
      }
    });
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
              name="title"
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
              label="Supervisor"
              name="supervisor"
              dependencies={["coSupervisor"]}
              rules={[
                { required: true, message: "Please select supervisor" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("coSupervisor") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("No duplicate supervisors allowed")
                    );
                  },
                }),
              ]}
            >
              <Select placeholder="Select supervisor">
                {members.map((supervisor) => {
                  if (supervisor.role.includes("SUPERVISOR"))
                    return (
                      <Option key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </Option>
                    );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Co-Supervisor"
              name="coSupervisor"
              dependencies={["supervisor"]}
              rules={[
                { required: true, message: "Please select co-supervisor" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("supervisor") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("No duplicate supervisors allowed")
                    );
                  },
                }),
              ]}
            >
              <Select placeholder="Select co-supervisor">
                {members.map((supervisor) => {
                  if (supervisor.role.includes("CO_SUPERVISOR"))
                    return (
                      <Option key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </Option>
                    );
                })}
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
                  <Select disabled={true} placeholder={user.name}>
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Member 2"
                  name="member2Id"
                  dependencies={["member3Id", "member4Id"]}
                  rules={[
                    { required: true, message: "Please select a member" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          (getFieldValue("member3Id") !== value) &
                            (getFieldValue("member4Id") !== value)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("No duplicate members allowed!")
                        );
                      },
                    }),
                  ]}
                >
                  <Select placeholder="Select member 2">
                    {students.map((member) => {
                      if (member.id !== user.id)
                        return (
                          <Option key={member.id} value={member.id}>
                            {member.name}
                          </Option>
                        );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Member 3"
                  name="member3Id"
                  dependencies={["member2Id", "member4Id"]}
                  rules={[
                    { required: true, message: "Please select a member" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          (getFieldValue("member2Id") !== value) &
                            (getFieldValue("member4Id") !== value)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("No duplicate members allowed!")
                        );
                      },
                    }),
                  ]}
                >
                  <Select placeholder="Select member 3">
                    {students.map((member) => {
                      if (member.id !== user.id)
                        return (
                          <Option key={member.id} value={member.id}>
                            {member.name}
                          </Option>
                        );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Member 4"
                  name="member4Id"
                  dependencies={["member3Id", "member2Id"]}
                  rules={[
                    { required: true, message: "Please select a member" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          (getFieldValue("member2Id") !== value) &
                            (getFieldValue("member3Id") !== value)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("No duplicate members allowed!")
                        );
                      },
                    }),
                  ]}
                >
                  <Select placeholder="Select member 4">
                    {students.map((member) => {
                      if (member.id !== user.id)
                        return (
                          <Option key={member.id} value={member.id}>
                            {member.name}
                          </Option>
                        );
                    })}
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
