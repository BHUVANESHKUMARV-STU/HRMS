import React, { useState } from "react";
import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {
  const [showRegularize, setShowRegularize] = useState(false);

  const shiftTime = "09:00 AM - 06:00 PM";
  const lateAfter = "09:15 AM";
  const weeklyOff = "Sunday";

  const [attendanceData] = useState([
    {
      date: "01 Feb 2026",
      shift: "General",
      biometric: "Face",
      checkIn: "09:02 AM",
      checkOut: "06:01 PM",
      status: "Present",
      workHours: "8h 59m",
      overtime: "0h",
    },
    {
      date: "02 Feb 2026",
      shift: "General",
      biometric: "RFID",
      checkIn: "09:30 AM",
      checkOut: "06:05 PM",
      status: "Late",
      workHours: "8h 35m",
      overtime: "0h",
    },
    {
      date: "03 Feb 2026",
      shift: "-",
      biometric: "-",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      workHours: "-",
      overtime: "-",
    },
    {
      date: "04 Feb 2026",
      shift: "Holiday",
      biometric: "-",
      checkIn: "-",
      checkOut: "-",
      status: "Holiday",
      workHours: "-",
      overtime: "-",
    },
  ]);

  return (
    <div className="attendance-wrapper">
      {/* HEADER */}
      <div className="attendance-header">
        <div>
          <h2>My Attendance</h2>
          <p className="shift-info">
            Shift: {shiftTime} | Late After: {lateAfter} | Weekly Off:{" "}
            {weeklyOff}
          </p>
        </div>
        <button
          className="regularize-btn"
          onClick={() => setShowRegularize(true)}
        >
          Request Regularization
        </button>
      </div>

      {/* SUMMARY */}
      <div className="attendance-summary">
        <div className="summary-card">
          <p>Present</p>
          <h3>18</h3>
        </div>

        <div className="summary-card">
          <p>Late Marks</p>
          <h3>3</h3>
        </div>

        <div className="summary-card">
          <p>Overtime</p>
          <h3>12h</h3>
        </div>

        <div className="summary-card">
          <p>Attendance %</p>
          <h3>92%</h3>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="attendance-card">
        <h3>Daily Attendance Log</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Biometric</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Work Hours</th>
                <th>OT</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.shift}</td>
                  <td>{item.biometric}</td>
                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>
                  <td>{item.workHours}</td>
                  <td>{item.overtime}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPORTS SECTION */}
      <div className="attendance-card">
        <h3>Reports</h3>

        <div className="report-grid">
          <div className="report-card">Daily Attendance Report</div>
          <div className="report-card">Monthly Summary</div>
          <div className="report-card">Shift vs Actual Report</div>
          <div className="report-card">Late Coming Analysis</div>
        </div>
      </div>

      {/* REGULARIZATION MODAL */}
      {showRegularize && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Attendance Regularization Request</h3>
            <input type="date" />
            <textarea placeholder="Enter reason..." />
            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={() => setShowRegularize(false)}
              >
                Submit
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowRegularize(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
