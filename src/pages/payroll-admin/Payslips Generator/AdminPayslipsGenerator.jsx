import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayslips = () => {
  const [department, setDepartment] = useState("All Departments");
  const [template, setTemplate] = useState("Standard Template");

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      role: "Senior Developer",
      dept: "Engineering",
      gross: 108500,
      deductions: 21200,
      status: "Pending",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      role: "Marketing Manager",
      dept: "Marketing",
      gross: 94500,
      deductions: 17500,
      status: "Pending",
    },
    {
      id: "EMP003",
      name: "Mike Johnson",
      role: "Sales Executive",
      dept: "Sales",
      gross: 65500,
      deductions: 10800,
      status: "Sent",
    },
  ]);

  /* ================= FILTER ================= */

  const filteredEmployees =
    department === "All Departments"
      ? employees
      : employees.filter((e) => e.dept === department);

  /* ================= KPIs ================= */

  const totalPayroll = useMemo(() => {
    return filteredEmployees.reduce(
      (sum, emp) => sum + (emp.gross - emp.deductions),
      0,
    );
  }, [filteredEmployees]);

  const generatedCount = filteredEmployees.filter(
    (e) => e.status === "Generated",
  ).length;

  const sentCount = filteredEmployees.filter((e) => e.status === "Sent").length;

  /* ================= ACTIONS ================= */

  const generatePayslips = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.status === "Pending" ? { ...emp, status: "Generated" } : emp,
      ),
    );
  };

  const sendAll = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.status === "Generated" ? { ...emp, status: "Sent" } : emp,
      ),
    );
  };

  const generateSingle = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status: "Generated" } : emp,
      ),
    );
  };

  const sendSingle = (id) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: "Sent" } : emp)),
    );
  };

  const downloadPayslip = (id) => {
    alert(`Downloading payslip for ${id}`);
  };

  return (
    <div className="payslip-container">
      {/* HEADER */}
      <div className="payslip-header">
        <div>
          <h1>Payslip Generator</h1>
          <p>Generate and distribute employee payslips</p>
        </div>

        <div className="payslip-actions">
          <button className="btn-outline" onClick={sendAll}>
            Send All
          </button>
          <button className="btn-primary" onClick={generatePayslips}>
            Generate Payslips
          </button>
        </div>
      </div>

      {/* CONFIGURATION */}
      <div className="config-card">
        <h3>Payslip Configuration</h3>

        <div className="config-grid">
          <div>
            <label>Payroll Month</label>
            <input type="month" defaultValue="2026-02" />
          </div>

          <div>
            <label>Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>

          <div>
            <label>Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option>Standard Template</option>
              <option>Corporate Template</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Employees</span>
          <h2>{filteredEmployees.length}</h2>
        </div>

        <div className="kpi-card">
          <span>Total Payroll</span>
          <h2>₹ {totalPayroll.toLocaleString()}</h2>
        </div>

        <div className="kpi-card">
          <span>Generated</span>
          <h2>{generatedCount}</h2>
        </div>

        <div className="kpi-card">
          <span>Sent</span>
          <h2>{sentCount}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => {
              const net = emp.gross - emp.deductions;

              return (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-info">
                      <strong>{emp.name}</strong>
                      <span>{emp.role}</span>
                    </div>
                  </td>

                  <td>{emp.dept}</td>
                  <td>₹ {emp.gross.toLocaleString()}</td>
                  <td>₹ {emp.deductions.toLocaleString()}</td>
                  <td className="net-salary">₹ {net.toLocaleString()}</td>

                  <td>
                    <span
                      className={`status-badge ${emp.status.toLowerCase()}`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    {emp.status === "Pending" && (
                      <button
                        className="btn-small primary"
                        onClick={() => generateSingle(emp.id)}
                      >
                        Generate
                      </button>
                    )}

                    {emp.status === "Generated" && (
                      <>
                        <button
                          className="btn-small success"
                          onClick={() => sendSingle(emp.id)}
                        >
                          Send
                        </button>

                        <button
                          className="btn-small outline"
                          onClick={() => downloadPayslip(emp.id)}
                        >
                          Download
                        </button>
                      </>
                    )}

                    {emp.status === "Sent" && (
                      <button
                        className="btn-small outline"
                        onClick={() => downloadPayslip(emp.id)}
                      >
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayslips;
