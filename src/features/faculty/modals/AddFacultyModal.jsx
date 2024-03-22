import React from "react";
import { Modal, Form, Input, Button } from "antd";

const { Item } = Form;

function AddFacultyModal({ form, open, handleOk, handleCancel }) {
  return (
    <Modal
      title="Add Faculty Member"
      width={500}
      styles={{
        body: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          className="px-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form className="md:w-96" form={form} name="facultyAdd" layout="vertical">
        <Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Item>

        <Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Item>

        <Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please input your contact number!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please input your position!",
            },
          ]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
}

export default AddFacultyModal;
