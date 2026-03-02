import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminSalaryRelease = () => {
  const [showModal, setShowModal] = useState(false);
  const [revisionPercent, setRevisionPercent] = useState("");

  const [salaryData, setSalaryData] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      dept: "Engineering",
      basic: 75000,
      allowances: 33500,
      deductions: 22700,
      status: "Active",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      dept: "Marketing",
      basic: 65000,
      allowances: 29500,
      deductions: 18700,
      status: "Active",
    },
  ]);

  /* ================= KPIs ================= */

  const totalEmployees = salaryData.length;

  const totalPayroll = useMemo(() => {
    return salaryData.reduce((sum, emp) => {
      const gross = emp.basic + emp.allowances;
      return sum + (gross - emp.deductions);
    }, 0);
  }, [salaryData]);

  const avgSalary =
    totalEmployees > 0 ? Math.floor(totalPayroll / totalEmployees) : 0;

  /* ================= ACTIONS ================= */

  // EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Department",
      "Basic",
      "Allowances",
      "Deductions",
    ];

    const rows = salaryData.map((emp) => [
      emp.id,
      emp.name,
      emp.dept,
      emp.basic,
      emp.allowances,
      emp.deductions,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "salary-master.csv";
    link.click();
  };

  // IMPORT MOCK (adds sample employee)
  const importMock = () => {
    const newEmployee = {
      id: "EMP00" + (salaryData.length + 1),
      name: "New Employee",
      dept: "Finance",
      basic: 50000,
      allowances: 20000,
      deductions: 10000,
      status: "Active",
    };

    setSalaryData((prev) => [...prev, newEmployee]);
  };

  // ADD EMPLOYEE
  const handleAddEmployee = (e) => {
    e.preventDefault();

    const form = e.target;

    const newEmployee = {
      id: form.id.value,
      name: form.name.value,
      dept: form.dept.value,
      basic: Number(form.basic.value),
      allowances: Number(form.allowances.value),
      deductions: Number(form.deductions.value),
      status: "Active",
    };

    setSalaryData((prev) => [...prev, newEmployee]);
    setShowModal(false);
  };

  // SALARY REVISION
  const applyRevision = () => {
    if (!revisionPercent) return;

    const percent = Number(revisionPercent);

    const updated = salaryData.map((emp) => ({
      ...emp,
      basic: Math.floor(emp.basic * (1 + percent / 100)),
    }));

    setSalaryData(updated);
    setRevisionPercent("");
  };

  return (
    <div className="salary-master-container">
      {/* HEADER */}
      <div className="salary-header">
        <div>
          <h2>Salary Master</h2>
          <p>Manage employee salary structures</p>
        </div>

        <div className="salary-actions">
          <button className="btn-light" onClick={importMock}>
            Import
          </button>

          <button className="btn-light" onClick={exportCSV}>
            Export
          </button>

          <input
            type="number"
            placeholder="% Revision"
            value={revisionPercent}
            onChange={(e) => setRevisionPercent(e.target.value)}
            style={{ width: "100px", padding: "6px" }}
          />

          <button className="btn-light" onClick={applyRevision}>
            Apply Revision
          </button>

          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Employee Salary
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="salary-kpi-grid">
        <div className="salary-kpi">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>

        <div className="salary-kpi">
          <h4>Total Payroll</h4>
          <p>₹ {totalPayroll.toLocaleString()}</p>
        </div>

        <div className="salary-kpi">
          <h4>Average Salary</h4>
          <p>₹ {avgSalary.toLocaleString()}</p>
        </div>

        <div className="salary-kpi">
          <h4>Pending Revisions</h4>
          <p>0</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="salary-table-card">
        <h3>Employee Salary Master</h3>

        <table className="salary-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Basic</th>
              <th>Allowances</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {salaryData.map((emp) => {
              const gross = emp.basic + emp.allowances;
              const net = gross - emp.deductions;

              return (
                <tr key={emp.id}>
                  <td>
                    <strong>{emp.name}</strong>
                    <div className="emp-id">{emp.id}</div>
                  </td>
                  <td>{emp.dept}</td>
                  <td>₹ {emp.basic.toLocaleString()}</td>
                  <td>₹ {emp.allowances.toLocaleString()}</td>
                  <td>₹ {gross.toLocaleString()}</td>
                  <td>₹ {emp.deductions.toLocaleString()}</td>
                  <td className="net-salary">₹ {net.toLocaleString()}</td>
                  <td>
                    <span className="status-pill active">{emp.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {showModal && (
        <div className="modal-wrapper">
          <div className="modal-box">
            <h3>Add Employee Salary</h3>

            <form onSubmit={handleAddEmployee}>
              <input name="id" placeholder="Employee ID" required />
              <input name="name" placeholder="Name" required />
              <input name="dept" placeholder="Department" required />
              <input
                name="basic"
                type="number"
                placeholder="Basic Salary"
                required
              />
              <input
                name="allowances"
                type="number"
                placeholder="Allowances"
                required
              />
              <input
                name="deductions"
                type="number"
                placeholder="Deductions"
                required
              />

              <div style={{ marginTop: "12px" }}>
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginLeft: "8px" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSalaryRelease;
