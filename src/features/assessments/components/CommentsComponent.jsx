import React from "react";

function CommentsComponent({ data, marks, project, assessmentType, rubric }) {
  console.log(marks);
  const content = () => {
    if (assessmentType === "Report") {
      return (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center">
              <div className="text-lg font-semibold mb-4 ">Supervisor:</div>
              <div className="text-gray-700 ml-4 mb-4 flex-1">
                {marks
                  .filter(
                    (element) => element.marker === project[0]?.supervisor?.id
                  )
                  .map((element, index) => (
                    <p key={index}>{element.comments}</p>
                  ))}
              </div>
            </div>
            {marks
              .filter(
                (element) => element.marker === project[0]?.supervisor?.id
              )
              .map((element, index) =>
                element?.marks?.map((mark, index) => (
                  <p key={index}>
                    {mark?.studentName} - {""}
                    {mark?.comments}
                  </p>
                ))
              )}
          </div>
          <div>
            <div className="flex">
              <div className="text-lg font-semibold mb-4 ">Co-Supervisor:</div>
              <div className="text-gray-700 ml-4 mb-4 flex-1">
                {marks
                  .filter(
                    (element) => element.marker === project[0]?.coSupervisor?.id
                  )
                  .map((element, index) => (
                    <p key={index}>{element.comments}</p>
                  ))}
              </div>
            </div>
            {marks
              .filter(
                (element) => element.marker === project[0]?.coSupervisor?.id
              )
              .map((element, index) =>
                element?.marks?.map((mark, index) => (
                  <p key={index}>
                    {mark?.studentName} - {""}
                    {mark?.comments}
                  </p>
                ))
              )}
          </div>
        </div>
      );
    } else {
      // Handle other assessment types if needed
      return null;
    }
  };
  return <div className="mb-14">{content()}</div>;
}

export default CommentsComponent;
