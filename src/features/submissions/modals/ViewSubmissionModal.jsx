import React from "react";
import { Divider, Modal, Spin } from "antd";
import { useSelector } from "react-redux";

function ViewSubmissionModal({ open, setOpen }) {
  const { submission, loading } = useSelector((state) => state.submission);
  const marks = useSelector((state) => state.marks);
  console.log(marks);
  return (
    <>
      {submission && (
        <Modal
          title="View Submission"
          open={open}
          onCancel={() => setOpen(false)}
          width={800}
          footer={null}
        >
          <Spin spinning={loading && marks.loading}>
            <div className="w-full mt-8">
              <div className="flex">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Project Title</h3>
                  <p>{submission?.project?.title}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Assessment Title</h3>
                  <p>
                    {submission?.assessmentId?.title} -{" "}
                    {submission?.assessmentId?.assessmentType}
                  </p>
                </div>
              </div>
              <div className="flex mt-8">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Date of Submission</h3>
                  <p>
                    {new Date(submission?.dateSubmitted).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Time of Submission</h3>
                  <p>
                    {new Date(submission?.dateSubmitted).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex mt-8">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Due Date</h3>
                  <p>
                    {new Date(
                      submission?.assessmentId?.dueDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      submission?.assessmentId?.dueDate
                    ).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    Late or Early Submission
                  </h3>
                  <p>
                    {() => {
                      const dueDate = new Date(
                        submission?.assessmentId?.dueDate
                      );
                      const submittedDate = new Date(submission?.dateSubmitted);
                      if (submittedDate > dueDate) {
                        return "Late Submission";
                      } else {
                        return "Early Submission";
                      }
                    }}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Members</h3>
                <ul>
                  <li>{submission?.project?.member1.name} - Leader</li>
                  <li>{submission?.project?.member2.name}</li>
                  <li>{submission?.project?.member3.name}</li>
                  <li>{submission?.project?.member4.name}</li>
                </ul>
              </div>
              {marks.marking && (
                <>
                  {" "}
                  <Divider />
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold">Marks</h3>
                    {marks && marks.marking.marking.length > 0 && (
                      <>
                        <div className="mt-8">
                          {marks.marking.marking.map((mark, index) => (
                            <div key={index} className="mt-4">
                              <h4 className="font-semibold">
                                Marker id: {mark.marker}
                              </h4>
                              <div className="grid grid-cols-3 gap-4">
                                {mark.marks.map((item, idx) => (
                                  <div key={idx} className="mt-2">
                                    <p>Student: {item.studentName}</p>
                                    {item.marks.map((mark, i) => (
                                      <div key={i} className="mt-1">
                                        <p>
                                          {mark.criteria}: {mark.marks}
                                        </p>
                                      </div>
                                    ))}
                                    <p>Comments: {item.comments}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </Spin>
        </Modal>
      )}
    </>
  );
}

export default ViewSubmissionModal;
