import React from "react";
import { Card, Button, Divider, List } from "antd";
import { getAllSemesters, updateSemester } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { openNotificationWithIcon } from "./../../../util/notifications";

const semester1 = [
  "Proposal Document",
  "Progress 1 presentations",
  "Status report 1",
];
const semester2 = [
  "Progress 2 presentation",
  "Final presentation",
  "Status report 2",
  "Log book",
  "Final thesis",
];

function SemesterContainer() {
  const { semesters } = useSelector((state) => state.semester);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllSemesters());
  }, []);

  const releaseMarks = (index) => {
    const y = semesters.filter((x) => x.id === index)[0];
    const x = { ...y };
    x.released = true;
    dispatch(updateSemester(x)).then((res) => {
      openNotificationWithIcon(
        "success",
        "Marks released!",
        " Marks have been released and can be accessed"
      );
      dispatch(getAllSemesters());
    });
  };

  const withholdMarks = (index) => {
    const y = semesters.filter((x) => x.id === index)[0];
    const x = { ...y };
    x.released = false;
    dispatch(updateSemester(x)).then((res) => {
      openNotificationWithIcon(
        "success",
        "Marks withheld!",
        " Marks have been withheld and canot be accessed"
      );
      dispatch(getAllSemesters());
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Semesters</h1>
      <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
      <div className="flex flex-row w-ful justify-end">
        <div className="flex md:flex-row w-full">
          <div className="border w-full flex flex-col mx-8 p-8 rounded-lg border-black h-full">
            <div className="text-5xl font-bold">Semester 1</div>
            <div className="mt-4 font-semibold text-lg">
              Status :{" "}
              {semesters?.filter((x) => x.id === 1)[0]?.released
                ? "Released"
                : "Not Released"}
            </div>
            <div className="mt-6">Assigned assessments:</div>
            <List
              size="small"
              className="ml-2 mt-2 w-[50%]"
              bordered
              dataSource={semester1}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <div className="mt-4 self-end place-self-end">
              <Button className="mr-6" danger onClick={() => releaseMarks(1)}>
                Release marks
              </Button>
              <Button
                className=""
                type="text"
                danger
                onClick={() => withholdMarks(1)}
              >
                Withdraw marks
              </Button>
            </div>
          </div>
          <div className="border w-full flex flex-col mx-8 p-8 rounded-lg border-black h-full">
            <div className="text-5xl font-bold">Semester 2</div>
            <div className="mt-4 font-semibold text-lg">
              Status :{" "}
              {semesters?.filter((x) => x.id === 2)[0]?.released
                ? "Released"
                : "Not Released"}
            </div>
            <div className="mt-6">Assigned assessments:</div>
            <List
              size="small"
              className="ml-2 mt-2 w-[50%]"
              bordered
              dataSource={semester2}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <div className="mt-4 self-end place-self-end">
              <Button className="mr-6" danger onClick={() => releaseMarks(2)}>
                Release marks
              </Button>
              <Button
                className=""
                type="text"
                danger
                onClick={() => withholdMarks(2)}
              >
                Withdraw marks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemesterContainer;
