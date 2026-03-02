import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayrollReports = () => {
  /* ================= STATE ================= */

  const [reportPeriod, setReportPeriod] = useState("2026-02");
  const [department, setDepartment] = useState("All Departments");
  const [reportType, setReportType] = useState("Summary Report");
  const [format, setFormat] = useState("PDF");
  const [activeTab, setActiveTab] = useState("Overview");
  const [showFilters, setShowFilters] = useState(false);

  /* ================= MOCK EMPLOYEE DATA ================= */

  const employees = [
    { id: 1, name: "John", dept: "Engineering", salary: 60000, tax: 10000 },
    { id: 2, name: "Kumar", dept: "HR", salary: 50000, tax: 8000 },
    { id: 3, name: "Priya", dept: "Finance", salary: 70000, tax: 15000 },
    { id: 4, name: "Arun", dept: "Engineering", salary: 80000, tax: 20000 },
  ];

  /* ================= FILTER LOGIC ================= */

  const filteredEmployees = useMemo(() => {
    if (department === "All Departments") return employees;
    return employees.filter((emp) => emp.dept === department);
  }, [department]);

  /* ================= CALCULATIONS ================= */

  const totalPayroll = useMemo(
    () => filteredEmployees.reduce((sum, e) => sum + e.salary, 0),
    [filteredEmployees],
  );

  const totalTax = useMemo(
    () => filteredEmployees.reduce((sum, e) => sum + e.tax, 0),
    [filteredEmployees],
  );

  const totalNet = totalPayroll - totalTax;

  const totalEmployees = filteredEmployees.length;

  const averageSalary =
    totalEmployees > 0 ? Math.round(totalPayroll / totalEmployees) : 0;

  /* ================= EXPORT FUNCTION ================= */

  const handleExport = () => {
    const data = `
Payroll Report
Period: ${reportPeriod}
Department: ${department}
Type: ${reportType}

Total Employees: ${totalEmployees}
Total Payroll: ₹${totalPayroll}
Total Tax: ₹${totalTax}
Net Payroll: ₹${totalNet}
`;

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Payroll_Report_${reportPeriod}.${format.toLowerCase()}`;
    link.click();
  };

  /* ================= QUICK REPORT ================= */

  const handleQuickGenerate = (title) => {
    if (title.includes("Department")) setActiveTab("Departments");
    else if (title.includes("Tax")) setActiveTab("Deductions");
    else if (title.includes("Cost")) setActiveTab("Overview");
    else setActiveTab("Overview");
  };

  /* ================= RENDER ================= */

  return (
    <div className="reports-container">
      {/* HEADER */}
      <div className="reports-header">
        <div>
          <h2>Payroll Reports</h2>
          <p>Comprehensive payroll analytics & insights</p>
        </div>

        <div className="reports-actions">
          <button
            className="btn-light"
            onClick={() => setShowFilters(!showFilters)}
          >
            Advanced Filters
          </button>
          <button className="btn-primary" onClick={handleExport}>
            Export Report
          </button>
        </div>
      </div>

      {/* CONFIGURATION */}
      {showFilters && (
        <div className="config-card">
          <h4>Report Configuration</h4>

          <div className="config-grid">
            <div>
              <label>Report Period</label>
              <input
                type="month"
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
              />
            </div>

            <div>
              <label>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>All Departments</option>
                <option>Engineering</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>

            <div>
              <label>Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option>Summary Report</option>
                <option>Detailed Report</option>
              </select>
            </div>

            <div>
              <label>Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option>PDF</option>
                <option>TXT</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* QUICK REPORTS */}
      <div className="quick-reports">
        {[
          "Monthly Payroll Summary",
          "Department-wise Analysis",
          "Tax Deduction Report",
          "Employee Cost Analysis",
        ].map((title, i) => (
          <div key={i} className="quick-card">
            <h5>{title}</h5>
            <button
              className="btn-light"
              onClick={() => handleQuickGenerate(title)}
            >
              Generate
            </button>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="reports-tabs">
        {["Overview", "Departments", "Deductions"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {activeTab === "Overview" && (
        <div className="analytics-grid">
          <div className="analytics-card">
            <h4>Total Payroll</h4>
            <p>₹ {totalPayroll.toLocaleString()}</p>
          </div>

          <div className="analytics-card">
            <h4>Total Net Pay</h4>
            <p>₹ {totalNet.toLocaleString()}</p>
          </div>

          <div className="analytics-card">
            <h4>Total Employees</h4>
            <p>{totalEmployees}</p>
          </div>

          <div className="analytics-card">
            <h4>Average Salary</h4>
            <p>₹ {averageSalary.toLocaleString()}</p>
          </div>
        </div>
      )}

      {activeTab === "Departments" && (
        <div className="analytics-card">
          <h4>Department Breakdown</h4>
          <ul>
            {["Engineering", "HR", "Finance"].map((dep) => {
              const total = employees
                .filter((e) => e.dept === dep)
                .reduce((sum, e) => sum + e.salary, 0);
              return (
                <li key={dep}>
                  {dep}: ₹ {total.toLocaleString()}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {activeTab === "Deductions" && (
        <div className="analytics-card">
          <h4>Tax & Deductions Summary</h4>
          <p>Total Tax Deducted: ₹ {totalTax.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPayrollReports;
