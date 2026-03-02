import { useState, useMemo } from "react";
import "./EmpLeave.css";

function EmpLeave() {
  const [casual] = useState(8);
  const [sick] = useState(6);
  const [earned] = useState(12);

  const [leaveHistory] = useState([
    {
      id: 1,
      type: "Sick Leave",
      from: "2026-02-10",
      to: "2026-02-10",
      days: 1,
      status: "Approved",
    },
    {
      id: 2,
      type: "Casual Leave",
      from: "2026-02-18",
      to: "2026-02-19",
      days: 2,
      status: "Pending",
    },
  ]);

  const totalLeaves = useMemo(() => {
    return leaveHistory.length;
  }, [leaveHistory]);

  return (
    <div className="leave-page">
      {/* HEADER */}
      <div className="leave-header">
        <div>
          <h2>My Leave Management</h2>
          <p>Track and manage your leave requests</p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="leave-stats">
        <div className="leave-card">
          <p className="card-label">Casual Leave</p>
          <h3 className="card-value">{casual}</h3>
          <p className="card-meta">Available</p>
        </div>

        <div className="leave-card">
          <p className="card-label">Sick Leave</p>
          <h3 className="card-value">{sick}</h3>
          <p className="card-meta">Available</p>
        </div>

        <div className="leave-card">
          <p className="card-label">Earned Leave</p>
          <h3 className="card-value">{earned}</h3>
          <p className="card-meta">Available</p>
        </div>

        <div className="leave-card">
          <p className="card-label">Total Requests</p>
          <h3 className="card-value">{totalLeaves}</h3>
          <p className="card-meta">Submitted</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="leave-table-card">
        <h3>Leave History</h3>
        <p className="sub-text">Overview of your past leave applications</p>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.type}</td>
                <td>
                  {leave.from} → {leave.to}
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
    </div>
  );
}

export default EmpLeave;
