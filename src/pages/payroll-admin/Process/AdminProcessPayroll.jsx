import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminProcessPayroll = () => {
  /* ================= STATE ================= */

  const [status, setStatus] = useState("DRAFT");

  const [employees, setEmployees] = useState([
    {
      id: 1,
      empId: "EMP001",
      name: "John",
      gross: 60000,
      deductions: 15000,
      status: "PENDING",
    },
    {
      id: 2,
      empId: "EMP002",
      name: "Kumar",
      gross: 75000,
      deductions: 20000,
      status: "PENDING",
    },
    {
      id: 3,
      empId: "EMP003",
      name: "Priya",
      gross: 50000,
      deductions: 12000,
      status: "PROCESSED",
    },
    {
      id: 4,
      empId: "EMP004",
      name: "Arun",
      gross: 82000,
      deductions: 25000,
      status: "PENDING",
    },
  ]);

  /* ================= DERIVED VALUES ================= */

  const totalEmployees = employees.length;

  const processedCount = employees.filter(
    (e) => e.status === "PROCESSED",
  ).length;

  const totalGross = useMemo(
    () => employees.reduce((sum, emp) => sum + emp.gross, 0),
    [employees],
  );

  const totalDeductions = useMemo(
    () => employees.reduce((sum, emp) => sum + emp.deductions, 0),
    [employees],
  );

  const totalNet = totalGross - totalDeductions;

  /* ================= ACTIONS ================= */

  // Edit salary
  const updateSalary = (id, field, value) => {
    if (status === "FINALIZED") return;

    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, [field]: Number(value) } : emp,
    );

    setEmployees(updated);
  };

  // Process single employee
  const processEmployee = (id) => {
    if (status === "FINALIZED") return;

    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, status: "PROCESSED" } : emp,
    );

    setEmployees(updated);
  };

  // Validate Payroll
  const validatePayroll = () => {
    if (status === "DRAFT") {
      setStatus("VALIDATED");
    }
  };

  // Approve Payroll
  const approvePayroll = () => {
    if (status === "VALIDATED") {
      setStatus("APPROVED");
    }
  };

  // Finalize Payroll
  const finalizePayroll = () => {
    if (status === "APPROVED") {
      setStatus("FINALIZED");
    }
  };

  const reopenPayroll = () => {
    setStatus("DRAFT");
  };

  /* ================= UI ================= */

  return (
    <div className="payroll-admin-container">
      <h1 className="payroll-title">Payroll Processing Console</h1>

      {/* ================= RUN INFO ================= */}
      <div className="payroll-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>Payroll Run – February 2026</h3>
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              Run ID: PR-2026-02 | Created By: HR Admin
            </p>
          </div>

          <span
            className={`status-badge ${status === "FINALIZED" ? "locked" : "active"}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* ================= KPI SUMMARY ================= */}
      <div className="payroll-grid">
        <div className="payroll-stat highlight">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Processed Employees</h4>
          <p>{processedCount}</p>
        </div>

        <div className="payroll-stat">
          <h4>Total Net Payroll</h4>
          <p>₹ {totalNet.toLocaleString()}</p>
        </div>
      </div>

      {/* ================= WORKFLOW ================= */}
      <div className="payroll-card">
        <h3>Payroll Workflow</h3>

        <div style={{ marginTop: "12px" }}>
          <button
            className="payroll-btn"
            onClick={validatePayroll}
            disabled={status !== "DRAFT"}
          >
            Validate
          </button>

          <button
            className="payroll-btn"
            onClick={approvePayroll}
            disabled={status !== "VALIDATED"}
          >
            Approve
          </button>

          <button
            className="payroll-btn danger"
            onClick={finalizePayroll}
            disabled={status !== "APPROVED"}
          >
            Finalize & Lock
          </button>

          {status === "FINALIZED" && (
            <button className="payroll-btn" onClick={reopenPayroll}>
              Reopen
            </button>
          )}
        </div>
      </div>

      {/* ================= EMPLOYEE TABLE ================= */}
      <div className="payroll-section">
        <h3>Employee Salary Management</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>

                <td>
                  <input
                    type="number"
                    value={emp.gross}
                    onChange={(e) =>
                      updateSalary(emp.id, "gross", e.target.value)
                    }
                    disabled={status === "FINALIZED"}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={emp.deductions}
                    onChange={(e) =>
                      updateSalary(emp.id, "deductions", e.target.value)
                    }
                    disabled={status === "FINALIZED"}
                  />
                </td>

                <td>₹ {(emp.gross - emp.deductions).toLocaleString()}</td>

                <td>
                  <span
                    className={
                      emp.status === "PROCESSED"
                        ? "status-pill status-approved"
                        : "status-pill status-pending"
                    }
                  >
                    {emp.status}
                  </span>
                </td>

                <td>
                  <button
                    className="payroll-btn"
                    onClick={() => processEmployee(emp.id)}
                    disabled={
                      emp.status === "PROCESSED" || status === "FINALIZED"
                    }
                  >
                    Process
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProcessPayroll;
