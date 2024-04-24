import React from "react";
import { Modal } from "antd";

function RubricViewModal({ visible, onClose, rubricData }) {
  return (
    <Modal
      title="Rubric Details"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="space-y-4">
        {rubricData?.criteria?.rubric?.map((item, index) => (
          <div key={index} className="border-b pb-4">
            <div className="font-semibold">Criteria: {item.criteria}</div>
            <div className="mt-2">Description: {item.description}</div>
            <div className="flex justify-between mt-2">
              <div>Marks: {item.marks}</div>
              <div>Weightage: {item.weightage}</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default RubricViewModal;
