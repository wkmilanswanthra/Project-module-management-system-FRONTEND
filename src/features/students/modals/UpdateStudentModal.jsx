import React from "react";
import { Form, Modal, Input, Button, Spin, Select } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;
function UpdateStudentModal({ student, open, handleOk, handleCancel }) {
  const { loading } = useSelector((state) => state.students);
  console.log(student);
  return (
    <Modal
      width={500}
      styles={{
        body: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      title="Update Student"
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
          {loading ? <Spin className="text-white" /> : "Update"}
        </Button>,
      ]}
    >
      <Form
        className="md:w-96"
        layout="vertical"
        initialValues={{
          name: student?.name,
          contact: student?.contact,
          address: student?.address,
          guardianName: student?.guardian?.name,
          guardianRelationship: student?.guardian?.relationship,
          specialization: student?.specialization,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter student name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            {
              required: true,
              message: "Please enter student contact",
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter student address",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Guardian Name"
          name="guardianName"
          rules={[{ required: true, message: "Please enter guardian name" }]}
        >
          <Input />
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
      </Form>
    </Modal>
  );
}

export default UpdateStudentModal;
