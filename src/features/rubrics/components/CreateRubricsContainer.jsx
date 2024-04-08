import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import { openNotificationWithIcon } from "../../../util/notifications";
import { useSelector, useDispatch } from "react-redux";
import { getAllAssessments } from "./../../assessments/api/index";
import {
  getRubricByAssessmentId,
  createRubric,
  updateRubric,
} from "./../api/index";

const { Option } = Select;

const CreateRubricsContainer = () => {
  const [criteriaRows, setCriteriaRows] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const { loading, error, rubric } = useSelector((state) => state.rubric);
  const { assessments } = useSelector((state) => state.assessment);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    getAssessments();
  }, []);

  const getAssessments = () => {
    dispatch(getAllAssessments()).then((res) => {
      if (res.payload) {
      }
    });
  };

  const fetchRubric = (assessmentId) => {
    console.log("Assessment ID:", assessmentId);
    dispatch(getRubricByAssessmentId(assessmentId)).then((res) => {
      console.log("Rubric:", res.payload);
      if (res.payload.criteria) {
        openNotificationWithIcon(
          "success",
          "Rubric found",
          "Edit existing rubric"
        );
        setIsUpdate(true);
        form.setFieldsValue({
          assessmentSelect: assessmentId,
          criteria: res.payload.criteria.rubric,
        });
        setCriteriaRows(res.payload.criteria.rubric);
      } else {
        openNotificationWithIcon(
          "success",
          "Rubric not found",
          "Create new rubric"
        );
        setIsUpdate(false);
        form.setFieldsValue({
          assessmentSelect: assessmentId,
          criteria: [],
        });
        setCriteriaRows([]);
      }
    });
  };

  const handleSubmit = (e) => {
    console.log("Form values:", e);
    const criteria = e.criteria.map((c) => {
      return {
        criteria: c.criteria,
        description: c.description,
        weightage: c.weightage,
        marks: c.marks,
      };
    });
    const data = {
      id: rubric?.id,
      assessmentId: e.assessmentSelect,
      criteria: {
        rubric: criteria,
      },
    };
    if (isUpdate) {
      dispatch(updateRubric(data)).then((res) => {
        if (res.payload) {
          openNotificationWithIcon(
            "success",
            "Success",
            "Rubric updated successfully"
          );
        }
      });
    } else {
      dispatch(createRubric(data)).then((res) => {
        if (res.payload) {
          openNotificationWithIcon(
            "success",
            "Success",
            "Rubric created successfully"
          );
        }
      });
    }
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
          {isUpdate ? "Edit Rubric" : "Create Rubric"}
        </h1>
        <Form
          form={form}
          disabled={loading}
          className="w-full max-w-md md:max-w-3xl grid grid-cols-2 gap-4"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          requiredMark={false}
          initialValues={{
            criteria: criteriaRows,
          }}
        >
          <div className="col-span-2">
            <Form.Item
              label="Select Assessment"
              name="assessmentSelect"
              rules={[{ required: true, message: "Please select assessment" }]}
            >
              <Select
                placeholder="Select assessment"
                onChange={(value) => fetchRubric(value)}
              >
                {assessments?.map((assessment) => (
                  <Option key={assessment.id} value={assessment.id}>
                    {`${assessment.title} - ${assessment.assessmentType}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.List
              name="criteria"
              rules={[
                {
                  validator: async (_, criteriaRows) => {
                    if (!criteriaRows || criteriaRows.length < 1) {
                      return Promise.reject(
                        new Error("At least 1 criteria is required")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restfield }) => (
                    <div
                      key={key}
                      className="relative grid grid-cols-4 gap-1 mt-1"
                    >
                      {console.log(fields)}
                      <Form.Item
                        label={name === 0 ? "Criteria" : ""}
                        {...restfield}
                        name={[name, "criteria"]}
                        className="w-full"
                        rules={[
                          { required: true, message: "Please enter criteria" },
                        ]}
                      >
                        <Input className="w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500" />
                      </Form.Item>
                      <Form.Item
                        label={name === 0 ? "Description" : ""}
                        {...restfield}
                        name={[name, "description"]}
                        className="w-full"
                        rules={[
                          {
                            required: true,
                            message: "Please enter description",
                          },
                        ]}
                      >
                        <Input className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 resize-none" />
                      </Form.Item>
                      <Form.Item
                        label={name === 0 ? "Weightage" : ""}
                        {...restfield}
                        name={[name, "weightage"]}
                        className="w-full"
                        rules={[
                          { required: true, message: "Please enter weightage" },
                        ]}
                      >
                        <Input
                          type="number"
                          className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                        />
                      </Form.Item>
                      <Form.Item
                        label={name === 0 ? "Marks" : ""}
                        {...restfield}
                        name={[name, "marks"]}
                        className="w-full"
                        rules={[
                          { required: true, message: "Please enter marks" },
                        ]}
                      >
                        <Input
                          type="number"
                          className="w-full text-sm  rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
                        />
                      </Form.Item>
                      {criteriaRows.length !== 1 && (
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          className={
                            name === 0
                              ? "absolute translate-x-[130%] right-0 top-[40%] mt-[0.3rem] mr-2 px-4 py-2"
                              : "absolute translate-x-[130%] right-0  mt-[0.3rem] mr-2 px-4 py-2"
                          }
                        />
                      )}
                    </div>
                  ))}
                  {criteriaRows.length <= 10 && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Criteria
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
            <div className="mt-10 flex flex-col col-span-2 w-full items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="px-2 my-2 min-w-[50%] w-[50%] bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
              >
                {isUpdate ? "Update Rubric" : "Create Rubric"}
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
