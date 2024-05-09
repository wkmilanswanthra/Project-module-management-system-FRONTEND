import React from "react";
import { useSelector } from "react-redux";
import { Modal, Tag } from "antd";

function ViewMarksheetModal({ open, setOpen }) {
  const { marksheet, loading } = useSelector((state) => state.marksheet);

  const calculateTotalMarks = (marks) => {
    return marks.reduce((total, mark) => total + parseInt(mark.marks), 0);
  };

  const calculateTotalOverallMarks = (marksheet) => {
    return marksheet?.marksheet?.marks?.reduce(
      (total, assessment) => total + calculateTotalMarks(assessment?.mark),
      0
    );
  };

  const calculateGrade = (averageMarks) => {
    return averageMarks >= 0.5 ? "Passed" : "Failed";
  };

  const getGrade = (averageMarks) => {
    console.log(averageMarks);
    if (averageMarks >= 0.8) {
      return "A";
    } else if (averageMarks >= 0.65) {
      return "B";
    } else if (averageMarks >= 0.5) {
      return "C";
    } else if (averageMarks >= 0.35) {
      return "D";
    } else {
      return "F";
    }
  };

  const totalOverallMarks = calculateTotalOverallMarks(marksheet);

  const averageMarks =
    totalOverallMarks / (10 * marksheet?.marksheet?.marks?.length);
  console.log(averageMarks);

  const pass = calculateGrade(averageMarks);

  const grade = getGrade(averageMarks);

  return (
    <>
      {marksheet && (
        <Modal
          title="View Marksheet"
          open={open}
          onCancel={() => setOpen(false)}
          width={800}
          footer={null}
        >
          <div className="w-full mt-8">
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Marksheet ID</h3>
                <p>{marksheet?.id}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Student </h3>
                <p>
                  {marksheet?.marksheet?.student?.name} -{" "}
                  {marksheet?.marksheet?.student?.id}
                </p>
              </div>
            </div>
            <div className="flex mt-8">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Marks</h3>
                {marksheet?.marksheet?.marks?.map((assessment, index) => (
                  <div key={index}>
                    <h4 className="text-md font-semibold">
                      {assessment.assessment.title}
                    </h4>
                    <p>Total Marks: {calculateTotalMarks(assessment.mark)}</p>
                  </div>
                ))}
                <div>
                  <h4 className="text-lg font-semibold mt-8">
                    Overall Total Marks
                  </h4>
                  <p>{totalOverallMarks}</p>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Grade</h3>
                <Tag color="blue">{grade}</Tag>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Pass / Fail</h3>
                <Tag color={pass === "Passed" ? "green" : "red"}>{pass}</Tag>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ViewMarksheetModal;
