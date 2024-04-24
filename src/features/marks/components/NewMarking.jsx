import React, { useEffect } from "react";
import { Divider, Table, Input, Form, ConfigProvider, Button } from "antd";
import { openNotificationWithIcon } from "../../../util/notifications";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubmission } from "../../submissions/api";
import { getRubricByAssessmentId } from "./../../rubrics/api/index";
import {
  getMarkingBySubmissionId,
  createNewmarking,
  updateMarking,
} from "./../api/index";

const { TextArea } = Input;

const NewMarking = () => {
  const [form] = Form.useForm();
  const { submission, loading, error } = useSelector(
    (state) => state.submission
  );
  const rubric = useSelector((state) => state.rubric);
  const { user } = useSelector((state) => state.auth);
  const { marking } = useSelector((state) => state.marks);
  const [isUpdate, setIsUpdate] = React.useState(false);

  const [data, setData] = React.useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    getData(id);
  }, []);

  const getData = (id) => {
    dispatch(getSubmission(id))
      .then((res) => {
        if (res.payload) {
          dispatch(getRubricByAssessmentId(res.payload.assessmentId.id)).then(
            (res) => {
              if (res.payload) {
                const rubricData = res.payload.criteria.rubric.map(
                  (item, index) => {
                    return {
                      key: index,
                      criteria: item.criteria,
                      description: item.description,
                      weightage: item.weightage,
                      marks: item.marks,
                    };
                  }
                );
                rubricData.push({});
                setData(rubricData);
                dispatch(getMarkingBySubmissionId(id)).then((res) => {
                  console.log(res);
                  if (res.payload) {
                    const userIndex = res.payload.marking.findIndex(
                      (item) => item.marker === user.id
                    );

                    if (userIndex === -1) {
                      setIsUpdate(false);
                      return;
                    }

                    console.log("userIndex", userIndex);

                    console.log("res.payload", res.payload.marking[userIndex]);

                    const markingData = res.payload.marking[
                      userIndex
                    ].marks.map((item, index) => {
                      const data = {};
                      item.marks.forEach((mark, index1) => {
                        data[`Student${index + 1}-${index1}`] = mark.marks;
                      });
                      data[`student${index + 1}-Comments`] = item.comments;
                      return data;
                    });

                    const x = markingData.reduce((acc, curr) => {
                      return { ...acc, ...curr };
                    }, {});

                    console.log(x);

                    form.setFieldsValue({
                      comments: res.payload.marking.comments,
                      ...x,
                    });

                    setIsUpdate(true);
                  } else if (res.payload.length === 0) {
                    openNotificationWithIcon(
                      "error",
                      "Error",
                      "No marking data found!"
                    );
                    setIsUpdate(false);
                  }
                });
              } else if (res.payload.length === 0) {
                openNotificationWithIcon(
                  "error",
                  "Error",
                  "No rubric data found!"
                );
              }
            }
          );
        } else if (res.payload.length === 0) {
          openNotificationWithIcon(
            "error",
            "Error",
            "No submission data found!"
          );
        }
      })
      .catch((error) => {
        openNotificationWithIcon("error", "Error", error.message);
      });
  };

  const onFinish = (values) => {
    console.log(values);
    let data1 = {
      id: marking.id || null,
      submissionId: marking.submissionId || id,
      marking: marking.marking || [],
    };

    let marksData = {
      marker: user.id,
      comments: values.comments,
      marks: [],
    };

    for (let i = 0; i < 4; i++) {
      const mark = {
        studentId: submission.project[`member${i + 1}`].id,
        studentName: submission.project[`member${i + 1}`].name,
        marks: [],
        comments: values[`student${i + 1}-Comments`],
      };

      for (let j = 0; j < rubric.rubric.criteria.rubric.length; j++) {
        const criteria = rubric.rubric.criteria.rubric[j];
        const studentMarks = {
          criteria: criteria.criteria,
          weightage: criteria.weightage,
          marks: null,
        };

        if (criteria.criteria) {
          studentMarks.marks = values[`Student${i + 1}-${j}`];
        }

        mark.marks.push(studentMarks);
      }

      marksData.marks.push(mark);
    }

    const x = data1.marking.findIndex((item) => item.marker === user.id);

    if (x === -1) {
      data1.marking = [...data1.marking, marksData];
    } else {
      data1.marking = data1.marking.map((item, index) => {
        if (index === x) {
          return marksData;
        } else {
          return item;
        }
      });
    }

    if (isUpdate) {
      dispatch(updateMarking(data1))
        .then((res) => {
          if (res.payload) {
            openNotificationWithIcon(
              "success",
              "Success",
              "Marking updated successfully!"
            );
            getData(id);
          } else {
            openNotificationWithIcon(
              "error",
              "Error",
              "Error updating marking!"
            );
          }
        })
        .catch((error) => {
          openNotificationWithIcon("error", "Error", error.message);
        });
    } else {
      dispatch(createNewmarking(data1))
        .then((res) => {
          if (res.payload) {
            openNotificationWithIcon(
              "success",
              "Success",
              "Marking created successfully!"
            );
            getData(id);
          } else {
            openNotificationWithIcon(
              "error",
              "Error",
              "Error creating marking!"
            );
          }
        })
        .catch((error) => {
          openNotificationWithIcon("error", "Error", error.message);
        });
    }
  };

  const columns = [
    {
      title: "Criteria",
      dataIndex: "criteria",
      key: "criteria",
      width: 150,
      render: (text, record) =>
        record.criteria ? record.criteria : "Comments",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text && <TextArea rows={2} value={text} readOnly />,
    },
    {
      title: "Weightage",
      dataIndex: "weightage",
      key: "weightage",
      width: 150,
      align: "center",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      width: 150,
      align: "center",
    },
    {
      title: submission?.project?.member1?.name || "Student 1",
      dataIndex: "student1",
      key: "student1",
      render: (text, record, index) => {
        if (record.criteria) {
          return (
            <Form.Item
              name={"Student1-" + record.key}
              key={index}
              rules={[{ required: true, message: "Marks are required!" }]}
            >
              <Input
                type="number"
                max={record.marks}
                min={0}
                placeholder="Enter marks"
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item name={"student1-Comments"} key={index}>
              <TextArea rows={2} value={text} placeholder="Enter Comments" />
            </Form.Item>
          );
        }
      },
      width: 150,
    },
    {
      title: submission?.project?.member2?.name || "Student 2",
      dataIndex: "student2",
      key: "student2",
      render: (text, record, index) => {
        if (record.criteria) {
          return (
            <Form.Item
              name={"Student2-" + record.key}
              key={index}
              rules={[{ required: true, message: "Marks are required!" }]}
            >
              <Input
                max={record.marks}
                min={0}
                type="number"
                placeholder="Enter marks"
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item name={"student2-Comments"} key={index}>
              <TextArea rows={2} value={text} placeholder="Enter Comments" />
            </Form.Item>
          );
        }
      },
      width: 150,
    },
    {
      title: submission?.project?.member3?.name || "Student 3",
      dataIndex: "student3",
      key: "student3",
      render: (text, record, index) => {
        if (record.criteria) {
          return (
            <Form.Item
              name={"Student3-" + record.key}
              key={index}
              rules={[{ required: true, message: "Marks are required!" }]}
            >
              <Input
                max={record.marks}
                min={0}
                type="number"
                placeholder="Enter marks"
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item name={"student3-Comments"} key={index}>
              <TextArea rows={2} value={text} placeholder="Enter Comments" />
            </Form.Item>
          );
        }
      },
      width: 150,
    },
    {
      title: submission?.project?.member4?.name || "Student 4",
      dataIndex: "student4",
      key: "student4",
      render: (text, record, index) => {
        if (record.criteria) {
          return (
            <Form.Item
              name={"Student4-" + record.key}
              key={index}
              rules={[{ required: true, message: "Marks are required!" }]}
            >
              <Input
                max={record.marks}
                min={0}
                type="number"
                placeholder="Enter marks"
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item name={"student4-Comments"} key={index}>
              <TextArea rows={2} value={text} placeholder="Enter Comments" />
            </Form.Item>
          );
        }
      },
      width: 150,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 mt-10">
        Mark Submission
      </h1>
      <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Group Name:</h2>
        <p className="text-gray-700">
          {submission?.project?.title} - ({submission?.project?.id})
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Assessment Title:
        </h2>
        <p className="text-gray-700">
          {" "}
          {submission?.assessmentId?.title} -{" "}
          {submission?.assessmentId?.assessmentType}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Description:</h2>
        <p className="text-gray-700">{submission?.assessmentId?.description}</p>
      </div>
      <Form
        disabled={loading}
        form={form}
        className="w-full"
        onFinish={onFinish}
      >
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#222",
                headerColor: "#fff",
                headerFilterHoverBg: "#fff",
                headerSortActiveBg: "#222",
                headerSortHoverBg: "#222",
              },
              Button: {
                primaryColor: "#444",
                primaryBg: "#fff",
                dangerColor: "#FF3200",
              },
            },
          }}
        >
          <Table
            disalbed={loading && rubric.loading}
            dataSource={data || null}
            columns={columns}
            pagination={false}
            bordered
            className="w-full"
          />{" "}
        </ConfigProvider>
        <div className="mt-12 w-full">
          <h2 className="text-xl font-semibold text-gray-900">Comments:</h2>
          <Form.Item name="comments">
            <TextArea rows={4} className="md:w-[40%]" />
          </Form.Item>
        </div>
        <div className="mt-6 mb-20 w-full flex justify-end">
          <Button
            htmlType="submit"
            className="mr-10 px-8 h-10 bg-gray-900 text-white font-bold  rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMarking;
