import React from "react";

function ExpandRow(record) {
  const content = () => {
    if (record.assessmentType === "Report") {
      return (
        <>
          <AssessorPanel title="Supervisor" assessor={record.supervisor} />
          <AssessorPanel
            title="Co - Supervisor"
            assessor={record.cosupervisor}
          />
        </>
      );
    } else {
      return (
        <>
          <ExaminerPanel examiner={record.examiner1} examinerNumber={1} />
          <ExaminerPanel examiner={record.examiner2} examinerNumber={2} />
          <ExaminerPanel examiner={record.examiner3} examinerNumber={3} />
        </>
      );
    }
  };

  const AssessorPanel = ({ title, assessor }) => (
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      {[0, 1, 2, 3].map((index) => (
        <p key={index}>
          {assessor?.ind[index].studentName} - {assessor?.ind[index].marks}
        </p>
      ))}
    </div>
  );

  const ExaminerPanel = ({ examiner, examinerNumber }) => (
    <div className="flex-1">
      <h3 className="text-lg font-semibold">Examiner {examinerNumber}</h3>
      {[0, 1, 2, 3].map((index) => (
        <p key={index}>
          {examiner?.ind[index].studentName} - {examiner?.ind[index].marks}
        </p>
      ))}
    </div>
  );

  return (
    <>
      <h2 className="text-xl font-semibold mb-3">Individual Marks</h2>
      <div className="w-full flex mb-6">{content()}</div>
    </>
  );
}

export default ExpandRow;
