import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { verifyEmail } from "../api";
import { openNotificationWithIcon } from "./../../../util/notifications";

function VerifyEmailContainer() {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(verifyEmail(values))
      .then((res) => {
        if (res.payload) {
          openNotificationWithIcon(
            "success",
            "Email verification",
            "Successfully verified email address."
          );
        } else {
          openNotificationWithIcon(
            "error",
            "Email verification",
            "Something went wrong. Please try again."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" flex flex-col flex-1 justify-center items-center bg-gray-100">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center mt-40 md:mt-0 mb-8">
          <h1 className="text-4xl font-bold  mb-4">Verify email address</h1>
        </div>
        <Form
          name="studentRegisterForm"
          className="w-full max-w-md md:max-w-3xl"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            className="w-full"
            name="email"
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
          <Button
            type="primary"
            htmlType="submit"
            className="px-2 my-2 min-w-[100%] w-[100%]   bg-gray-900 text-white font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          >
            {loading ? <Spin className="text-white" /> : "Verify"}
          </Button>
          <div className="mt-4 w-full">
            <Link
              to="/welcome"
              className="mt-4 w-full block text-center bg-gray-300 text-gray-900 font-bold py-2 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
            >
              Back
            </Link>
          </div>
        </Form>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
}

export default VerifyEmailContainer;
