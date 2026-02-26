import React from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Employee Dashboard</h2>
          <p>Overview of attendance, leave, payroll & activities</p>
        </div>
        <div className="header-info">
          <span>Today: 26 Feb 2026</span>
          <span>Shift: 09:00 AM - 06:00 PM</span>
        </div>
      </div>

      {/* KPI SECTION */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Net Salary (Feb)</p>
          <h3>₹45,000</h3>
          <span>Credited on 5 Feb</span>
        </div>

        <div className="kpi-card">
          <p>Total Leave Balance</p>
          <h3>14 Days</h3>
          <span>CL + SL + EL</span>
        </div>

        <div className="kpi-card">
          <p>Attendance</p>
          <h3>92%</h3>
          <span>18 / 20 Days</span>
        </div>

        <div className="kpi-card">
          <p>Overtime</p>
          <h3>12 Hours</h3>
          <span>This Month</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="main-grid">
        {/* ATTENDANCE SUMMARY */}
        <div className="card">
          <h3>Attendance Summary</h3>
          <div className="summary-grid">
            <div>
              <span>Present</span>
              <strong>18</strong>
            </div>
            <div>
              <span>Late</span>
              <strong>3</strong>
            </div>
            <div>
              <span>Absent</span>
              <strong>2</strong>
            </div>
            <div>
              <span>Weekly Off</span>
              <strong>4</strong>
            </div>
          </div>
        </div>

        {/* LEAVE SUMMARY */}
        <div className="card">
          <h3>Leave Summary</h3>
          <div className="summary-grid">
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

        {/* PAYROLL */}
        <div className="card">
          <h3>Payroll Details</h3>
          <ul className="list">
            <li>Basic Salary: ₹30,000</li>
            <li>HRA: ₹8,000</li>
            <li>Allowances: ₹7,000</li>
            <li>Deductions: ₹2,500</li>
          </ul>
        </div>

        {/* UPCOMING HOLIDAYS */}
        <div className="card">
          <h3>Upcoming Holidays</h3>
          <ul className="list">
            <li>08 Mar – Mahashivratri</li>
            <li>25 Mar – Holi</li>
          </ul>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="dot"></span>
            Leave applied (18 Feb)
          </div>
          <div className="activity-item">
            <span className="dot"></span>
            Salary credited (05 Feb)
          </div>
          <div className="activity-item">
            <span className="dot"></span>
            Attendance regularized (02 Feb)
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
