import React from "react";
import { Modal, Button, Checkbox, Spin } from "antd";
import { useSelector } from "react-redux";
import { Roles } from "../../../assets/constants";

const rolesList = Object.keys(Roles).map((role) => {
  return role;
});

function AddRolesModal({
  selectedRoles,
  setSelectedRoles,
  isModalOpen,
  handleOk,
  handleCancel,
}) {
  const { loading } = useSelector((state) => state.faculty);

  const handleCheckboxChange = (e, role) => {
    if (e.target.checked) {
      setSelectedRoles([...selectedRoles, role]);
    } else {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    }
  };

  return (
    <Modal
      title="Modify roles"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          className="px-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          {loading ? <Spin className="text-white" /> : "Done"}
        </Button>,
      ]}
    >
      {rolesList.map((role) => (
        <div key={role}>
          <Checkbox
            checked={selectedRoles.includes(role)}
            onChange={(e) => handleCheckboxChange(e, role)}
            disabled={
              role === Roles.STUDENT ||
              role === Roles.STAFF ||
              role === Roles.PROJECT_LEADER
            }
          >
            {role}
          </Checkbox>
        </div>
      ))}
    </Modal>
  );
}

export default AddRolesModal;
