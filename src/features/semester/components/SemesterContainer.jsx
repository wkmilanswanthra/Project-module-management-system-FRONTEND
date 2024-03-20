import React from "react";
import { Card, Button, Divider, List } from "antd";

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
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-4">Semesters</h1>
      <Divider style={{ borderBlockStart: "1px solid #ccc" }} />
      <div className="flex flex-row w-ful justify-end">
        <div className="flex md:flex-row w-full">
          <div className="border w-full flex flex-col mx-8 p-8 rounded-lg border-black h-full">
            <div className="text-5xl font-bold">Semester 1</div>
            <div className="mt-4 font-semibold text-lg">Status : Released</div>
            <div className="mt-6">Assigned assessments:</div>
            <List
              size="small"
              className="ml-2 mt-2 w-[50%]"
              bordered
              dataSource={semester1}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <div className="mt-4 self-end place-self-end">
              <Button className="mr-6" danger>
                Release marks
              </Button>
              <Button className="" type="text" danger>
                Withdraw marks
              </Button>
            </div>
          </div>
          <div className="border w-full flex flex-col mx-8 p-8 rounded-lg border-black h-full">
            <div className="text-5xl font-bold">Semester 2</div>
            <div className="mt-4 font-semibold text-lg">Status : Released</div>
            <div className="mt-6">Assigned assessments:</div>
            <List
              size="small"
              className="ml-2 mt-2 w-[50%]"
              bordered
              dataSource={semester2}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <div className="mt-4 self-end place-self-end">
              <Button className="mr-6" danger>
                Release marks
              </Button>
              <Button className="" type="text" danger>
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
