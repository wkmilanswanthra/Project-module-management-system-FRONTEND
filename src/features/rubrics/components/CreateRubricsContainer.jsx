import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import { openNotificationWithIcon } from "../../../util/notifications";

const { Option } = Select;

const AssessmentList = [
  {
    title: "Assessment 1",
    id: 1,
  },
  {
    title: "Assessment 2",
    id: 2,
  },
];

const CreateRubricsContainer = () => {
  const [criteriaRows, setCriteriaRows] = useState([
    { criteria: "", description: "", weightage: "", marks: "" },
  ]);

  const handleAddRow = () => {
    if (criteriaRows.length < 10) {
      setCriteriaRows([
        ...criteriaRows,
        { criteria: "", description: "", weightage: "", marks: "" },
      ]);
    } else
      openNotificationWithIcon("error", "Error", "You can add only 10 rows");
  };

  const handleRemoveRow = (index) => {
    if (criteriaRows.length > 1) {
      const updatedRows = [...criteriaRows];
      updatedRows.splice(index, 1);
      setCriteriaRows(updatedRows);
    } else
      openNotificationWithIcon("error", "Error", "You can't remove all rows");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values:", e);
    openNotificationWithIcon(
      "success",
      "Success",
      "Rubric created successfully"
    );
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedRows = [...criteriaRows];
    updatedRows[index][field] = value;
    setCriteriaRows(updatedRows);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Create Rubric
        </h1>
        <Form
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <div className="col-span-2">
            <Form.Item
              label="Select Assessment"
              name="assessmentSelect"
              rules={[{ required: true, message: "Please select assessment" }]}
            >
              <Select placeholder="Select assessment">
                {AssessmentList.map((assessment) => (
                  <Option key={assessment.id} value={assessment.id}>
                    {assessment.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {criteriaRows.length < 10 && (
              <div className="col-span-3 flex items-center justify-end">
                <Button
                  type="button"
                  onClick={handleAddRow}
                  className="px-4 py-2 text-sm bg-gray-900 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  icon={<PlusOutlined />}
                >
                  Add Row
                </Button>
              </div>
            )}
            {criteriaRows.map((row, index) => (
              <div key={index} className="relative grid grid-cols-4 gap-1 mt-1">
                <Form.Item
                  label="Criteria"
                  name={`criteria-${index}`}
                  className="w-full"
                  rules={[{ required: true, message: "Please enter criteria" }]}
                >
                  <Input
                    value={row.criteria}
                    onChange={(e) =>
                      handleCriteriaChange(index, "criteria", e.target.value)
                    }
                    className="w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name={`description-${index}`}
                  className="w-full"
                  rules={[{ required: true, message: "Please enter criteria" }]}
                >
                  <Input
                    value={row.description}
                    onChange={(e) =>
                      handleCriteriaChange(index, "description", e.target.value)
                    }
                    className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </Form.Item>
                <Form.Item
                  label="Weightage"
                  name={`weightage-${index}`}
                  className="w-full"
                  rules={[{ required: true, message: "Please enter criteria" }]}
                >
                  <Input
                    type="number"
                    value={row.weightage}
                    onChange={(e) =>
                      handleCriteriaChange(index, "weightage", e.target.value)
                    }
                    className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>
                <Form.Item
                  label="Marks"
                  name={`marks-${index}`}
                  className="w-full"
                  rules={[{ required: true, message: "Please enter criteria" }]}
                >
                  <Input
                    type="number"
                    value={row.marks}
                    onChange={(e) =>
                      handleCriteriaChange(index, "marks", e.target.value)
                    }
                    className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                  />
                </Form.Item>
                {criteriaRows.length !== 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="absolute translate-x-[130%] right-0 top-[37%] mt-[0.3rem] mr-2 px-4 py-2 text-sm bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                    icon={<MinusCircleOutlined />}
                  />
                )}
              </div>
            ))}
            <div className="mt-10 flex flex-col col-span-2 w-full items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
              >
                Create Rubric
              </Button>
              <Link
                to={".."}
                className="px-2 my-2 w-[50%] text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
              >
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateRubricsContainer;
