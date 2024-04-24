import React from "react";
import { Modal, Form, Input, Button, Select, Spin } from "antd";
import { useSelector } from "react-redux";

const { Item } = Form;

function AddFacultyModal({
  form,
  open,
  handleOk,
  handleCancel,
  selecetedUser,
  isUpdate,
}) {
  const { loading } = useSelector((state) => state.faculty);

  React.useEffect(() => {
    if (selecetedUser) {
      form.setFieldsValue(selecetedUser);
    }
  }, [selecetedUser]);

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
          {loading ? <Spin className="text-white" /> : "Done"}
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
            {
              pattern: /^[a-zA-Z0-9._%+-]+@sliit\.lk$/,
              message: "Please enter a valid SLIIT email address",
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

        {!isUpdate && (
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
        )}

        {!isUpdate && (
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Item>
        )}

        <Item
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
          <Input placeholder="Contact Number" />
        </Item>

        <Item
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
            <Select.Option value="Instructor">Instructor</Select.Option>
            <Select.Option value="Lecturer">Lecturer</Select.Option>
            <Select.Option value="Lecturer (Higher Grade)">
              Lecturer (Higher Grade)
            </Select.Option>
            <Select.Option value="Assistant Professor">
              Assistant Professor
            </Select.Option>
            <Select.Option value="Associate Professor">
              Associate Professor
            </Select.Option>
            <Select.Option value="Professor">Professor</Select.Option>
            <Select.Option value="Senior Professor">
              Senior Professor
            </Select.Option>
          </Select>
        </Item>
        <Item
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
          <Input placeholder="EMP0001" />
        </Item>
      </Form>
    </Modal>
  );
}

export default AddFacultyModal;
