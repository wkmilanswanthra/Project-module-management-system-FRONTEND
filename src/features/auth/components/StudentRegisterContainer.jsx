import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { register } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";

const StudentRegisterContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    values.student = true;
    values.al = {
      stream: values.alStreams,
      results: values.alResults,
    };
    delete values.alStreams;
    delete values.alResults;
    values.guardian = {
      name: values.guardianName,
      relationship: values.relationship,
    };
    delete values.guardianName;
    delete values.relationship;

    console.log("Received values:", values);
    dispatch(register(values))
      .then((res) => {
        if (res.payload.token) {
          localStorage.setItem("token", res.payload.token);
          openNotificationWithIcon("success", "Registered successfully!", "");
          navigate("/");
        } else {
          openNotificationWithIcon(
            "error",
            "Registration failed",
            "There was and error while creating new user"
          );
        }
      })
      .catch((e) => {
        openNotificationWithIcon(
          "error",
          "An error occured",
          "There was and error while creating new user"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Student Registration
        </h1>
        <Form
          name="studentRegisterForm"
          className="w-full max-w-md md:max-w-3xl  grid grid-cols-2 gap-4"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <div className="col-span-2 md:col-span-1">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item
              name="batch"
              label="Batch"
              rules={[
                {
                  required: true,
                  message: "Please select your batch",
                },
              ]}
            >
              <Select placeholder="Select batch">
                <Option value="Regular">Regular</Option>
                <Option value="June">June</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="relationship"
              label="Relationship to guardian"
              rules={[
                {
                  required: true,
                  message: "Please select your relationship to guardian",
                },
              ]}
            >
              <Select placeholder="Select relationship">
                <Option value="Father">Father</Option>
                <Option value="Mother">Mother</Option>
                <Option value="Guardian">Guardian</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="alStreams"
              label="A/L Stream"
              rules={[
                {
                  required: true,
                  message: "Please select your A/L stream",
                },
              ]}
            >
              <Select placeholder="Select stream">
                <Option value="Physics">Physics</Option>
                <Option value="Biology">Biology</Option>
                <Option value="Commerce">Commerce</Option>
                <Option value="Arts">Arts</Option>
                <Option value="Technology">Technology</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-span-2 md:col-span-1">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@my\.sliit\.lk$/,
                  message: "Please enter a valid SLIIT email address",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your contact number",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const contactRegex = /^0[0-9]{9}$/;
                    if (!value || contactRegex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Please enter a valid contact number ")
                    );
                  },
                }),
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
            </Form.Item>
            <Form.Item
              name="specialization"
              label="Specialization"
              rules={[
                {
                  required: true,
                  message: "Please select your specialization",
                },
              ]}
            >
              <Select placeholder="Select Specialization">
                <Option value="IT">Information Technology</Option>
                <Option value="SE">Software Engineering</Option>
                <Option value="IS">Information Systems</Option>
                <Option value="CS">Cyber Security</Option>
                <Option value="DS">Data Science</Option>
                <Option value="CSNE">
                  Computer Systems and Network Engineering
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="registrationNumber"
              label="Registration Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your registration number",
                },
                {
                  pattern: /^(IT\d{8})$/,
                  message: "Please enter a valid registration number",
                },
              ]}
            >
              <Input placeholder="IT0000000001" />
            </Form.Item>
            <Form.Item
              name="guardianName"
              label="Guardian Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the name of your guardian",
                },
              ]}
            >
              <Input placeholder="Guardian Name" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Temporary Residence"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter the address of your temporary residence",
                },
              ]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="alResults"
              label="A/L Results"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter your A/L results in the format Subject:Grade, Subject:Grade, ...",
                },
              ]}
            >
              <Input placeholder="Subject:Grade, Subject:Grade, ... " />
            </Form.Item>
          </div>
          <div className="flex flex-col col-span-2 w-full items-center">
            <div className="text-sm text-gray-500 hover:text-blue-500 mt-4 mb-2 w-min-[50%]">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="px-2 my-2 min-w-[50%] w-[50%]   bg-gray-900 text-white font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              {loading ? <Spin className="text-white" /> : "Register"}
            </Button>
            <Link to="/welcome/login">Cancel</Link>
            <div className="text-sm text-gray-500 hover:text-blue-500 mt-4 mb-2">
              <Link to="/welcome/faculty/signup">
                <span className="font-bold"> Or </span>Sign Up as a faculty
                member
              </Link>
            </div>
          </div>
        </Form>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm ">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentRegisterContainer;
