import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../api";
import { openNotificationWithIcon } from "../../../util/notifications";

const { Option } = Select;

const FacultyRegisterContainer = () => {
  const { loading, user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    values.stuent = false;

    console.log("Received values:", values);
    dispatch(register(values)).then((res) => {
      localStorage.setItem("token", res.payload.token);
      if (res.payload.token) {
        openNotificationWithIcon(
          "success",
          "Registration Successful",
          "You have successfully registered"
        );
        navigate("/");
      } else {
        if (res.message?.includes("duplicate")) {
          openNotificationWithIcon(
            "error",
            "Registration Failed",
            "Username already exists"
          );
        } else {
          openNotificationWithIcon(
            "error",
            "Registration Failed",
            "An error occurred while registering"
          );
        }
      }
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
          Faculty Member Registration
        </h1>
        <Form
          name="facultyRegisterForm"
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
              name="position"
              label="Position"
              rules={[
                {
                  required: true,
                  message: "Please select your position",
                },
              ]}
            >
              <Select placeholder="Select Position">
                <Option value="Instructor">Instructor</Option>
                <Option value="Lecturer">Lecturer</Option>
                <Option value="Lecturer (Higher Grade)">
                  Lecturer (Higher Grade)
                </Option>
                <Option value="Assistant Professor">Assistant Professor</Option>
                <Option value="Associate Professor">Associate Professor</Option>
                <Option value="Professor">Professor</Option>
                <Option value="Senior Professor">Senior Professor</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="registrationNumber"
              label="Employ Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your Employ number",
                },
                {
                  pattern: /^(EMP\d{4})$/,
                  message: "Please enter a valid Employ number",
                },
              ]}
            >
              <Input placeholder="Employ Number" />
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
              className="px-2 my-2 min-w-[50%] w-[50%]   bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              Register
            </Button>
            <Link
              to="/login"
              className="px-2 my-2 w-[50%]  text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm justify-end">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
};

export default FacultyRegisterContainer;
