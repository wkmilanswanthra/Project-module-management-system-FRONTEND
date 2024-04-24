import React from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { openNotificationWithIcon } from "../../../util/notifications";

import { login } from "./../api/index";
import { useSelector, useDispatch } from "react-redux";

const LoginContainer = () => {
  const { loading, user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values:", values);
    dispatch(login(values))
      .then((res) => {
        if (res.payload.token) {
          localStorage.setItem("token", res.payload.token);
          if (res.payload.project) {
            localStorage.setItem(
              "project",
              JSON.stringify(res.payload.project)
            );
          }
          openNotificationWithIcon(
            "success",
            "Login Successful",
            "You have successfully logged in"
          );
          navigate("/", { replace: true });
        } else {
          openNotificationWithIcon(
            "error",
            "Login Failed",
            "Invalid Credentials"
          );
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          "error",
          "Login Failed",
          "An error occurred while logging in"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Welcome Back
        </h1>
        <Form
          name="loginForm"
          className="w-full max-w-lg"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          size="large"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username / Reg. Number / Emp. Number"
            rules={[
              {
                required: true,
                message:
                  "Please enter your username / registration number / employee number",
              },
            ]}
          >
            <Input
              className="w-full"
              prefix={<UserOutlined />}
              placeholder="Username / Reg. Number / Emp. Number"
            />
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
            <Input
              type="password"
              className="w-full"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="px-2 my-2 w-full h-12 bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
              disabled={loading}
            >
              {loading ? <Spin className="text-white" /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-sm text-gray-500 mt-14 mb-2">
          Not registered yet?
        </div>
        <Link
          to="/welcome/signup"
          className="w-full text-center max-w-lg mt-4 bg-gray-300 border border-gray-300 hover:bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-sm transition duration-300 ease-in-out"
        >
          Sign Up as a Student
        </Link>
        <div className="text-sm text-gray-500 hover:text-blue-500 mt-4 mb-2">
          <Link to="/welcome/faculty/signup">
            <span className="font-bold"> Or </span>Sign Up as a faculty member
          </Link>
        </div>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500  text-sm ">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginContainer;
