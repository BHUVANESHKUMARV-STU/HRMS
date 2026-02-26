import { useState } from "react";
import "./EmployeeLeave.css";

const EmployeeLeave = () => {
  const [leaves] = useState([
    {
      id: 1,
      type: "Casual Leave",
      from: "18 Feb 2026",
      to: "19 Feb 2026",
      days: 2,
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "10 Feb 2026",
      to: "10 Feb 2026",
      days: 1,
      status: "Approved",
    },
    {
      id: 3,
      type: "Earned Leave",
      from: "01 Feb 2026",
      to: "03 Feb 2026",
      days: 3,
      status: "Rejected",
    },
  ]);

  return (
    <div className="leave-dashboard">
      {/* HEADER */}
      <div className="leave-top">
        <div>
          <h2>Leave Management</h2>
          <p>Manage leave requests, balances & policies</p>
        </div>
        <button className="primary-btn">Apply Leave</button>
      </div>

      <div className="leave-layout">
        {/* LEFT PANEL */}
        <div className="left-panel">
          {/* BALANCE */}
          <div className="card">
            <h3>Leave Balance</h3>
            <div className="balance-grid">
              <div>
                <span>Casual</span>
                <strong>8</strong>
              </div>
              <div>
                <span>Sick</span>
                <strong>6</strong>
              </div>
              <div>
                <span>Earned</span>
                <strong>12</strong>
              </div>
              <div>
                <span>Comp Off</span>
                <strong>2</strong>
              </div>
            </div>
          </div>

          {/* POLICY */}
          <div className="card">
            <h3>Leave Policy</h3>
            <ul className="policy-list">
              <li>Accrual: 1.5 EL / month</li>
              <li>Carry Forward: Max 30 days</li>
              <li>Encashment Allowed</li>
              <li>Sandwich Rule Enabled</li>
            </ul>
          </div>

          {/* CALENDAR */}
          <div className="card">
            <h3>Calendar - Feb 2026</h3>
            <div className="calendar">
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className={`day ${i === 17 || i === 18 ? "leave-day" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="card">
            <h3>My Leave Requests</h3>

            <table className="leave-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.type}</td>
                    <td>
                      {leave.from} - {leave.to}
                    </td>
                    <td>{leave.days}</td>
                    <td>
                      <span className={`status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* APPROVAL PIPELINE */}
          <div className="card">
            <h3>Approval Workflow</h3>
            <div className="workflow">
              <div className="wf-step active">Employee</div>
              <div className="wf-step">Manager</div>
              <div className="wf-step">HR</div>
              <div className="wf-step">Balance Update</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeave;
