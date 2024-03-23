import React from "react";
import { Card } from "antd";

export const renderRow = (record) => {
  return (
    <>
      <div className="grid grid-cols-6 w-full">
        <div className="col-span-1 px-1">
          <Card
            title="Supervisor"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.supervisor.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.supervisor.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.supervisor.email}
            </p>
            <p>
              <strong>Position:</strong> {record.supervisor.position}
            </p>
          </Card>
        </div>
        <div className="col-span-1 px-1">
          <Card
            title="Co Supervisor"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.coSupervisor.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.coSupervisor.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.coSupervisor.email}
            </p>
            <p>
              <strong>Position:</strong> {record.coSupervisor.position}
            </p>
          </Card>{" "}
        </div>
        <div className="col-span-1 px-1">
          <Card
            title="Member 1 (Leader)"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.member1.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.member1.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.member1.email}
            </p>
            <p>
              <strong>Registration Number:</strong>{" "}
              {record.member1.registrationNumber}
            </p>
            <p>
              <strong>Specialization:</strong> {record.member1.specialization}
            </p>
          </Card>{" "}
        </div>
        <div className="col-span-1 px-1">
          <Card
            title="Member 2"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.member2.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.member2.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.member2.email}
            </p>
            <p>
              <strong>Registration Number:</strong>{" "}
              {record.member2.registrationNumber}
            </p>
            <p>
              <strong>Specialization:</strong> {record.member2.specialization}
            </p>
          </Card>{" "}
        </div>
        <div className="col-span-1 px-1">
          <Card
            title="Member 3"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.member3.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.member3.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.member3.email}
            </p>
            <p>
              <strong>Registration Number:</strong>{" "}
              {record.member3.registrationNumber}
            </p>
            <p>
              <strong>Specialization:</strong> {record.member3.specialization}
            </p>
          </Card>{" "}
        </div>
        <div className="col-span-1 px-1">
          <Card
            title="Member 4"
            bordered={false}
            style={{ width: "100%", height: "100%" }}
          >
            <p>
              <strong>Name:</strong> {record.member4.name}
            </p>
            <p>
              <strong>Contact:</strong> {record.member4.contact}
            </p>
            <p>
              <strong>Email:</strong> {record.member4.email}
            </p>
            <p>
              <strong>Registration Number:</strong>{" "}
              {record.member4.registrationNumber}
            </p>
            <p>
              <strong>Specialization:</strong> {record.member4.specialization}
            </p>
          </Card>{" "}
        </div>
      </div>
    </>
  );
};
