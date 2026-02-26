import React, { useState, useMemo } from "react";
import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {
  /* =========================
     EMPLOYEE ATTENDANCE DATA
  ========================= */
  const [attendanceData] = useState([
    {
      date: "2024-02-01",
      checkIn: "09:05 AM",
      checkOut: "06:00 PM",
      status: "Present",
      workHours: "8h 55m",
      overtime: "0h 0m",
      notes: "-",
    },
    {
      date: "2024-02-02",
      checkIn: "09:35 AM",
      checkOut: "06:10 PM",
      status: "Late",
      workHours: "8h 35m",
      overtime: "0h 10m",
      notes: "Traffic",
    },
  ]);

  /* =========================
     FILTER STATE
  ========================= */
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FORMAT DATE
  ========================= */
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredAttendance = useMemo(() => {
    return attendanceData.filter(
      (item) =>
        item.date.includes(searchDate) &&
        item.status.toLowerCase().includes(searchStatus.toLowerCase()),
    );
  }, [attendanceData, searchDate, searchStatus]);

  const totalPages = Math.ceil(filteredAttendance.length / ITEMS_PER_PAGE);

  const paginatedAttendance = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAttendance.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAttendance, currentPage]);

  /* =========================
     CALCULATED STATS
  ========================= */
  const totalPresent = attendanceData.filter(
    (a) => a.status === "Present",
  ).length;
  const totalLate = attendanceData.filter((a) => a.status === "Late").length;
  const totalAbsent = attendanceData.filter(
    (a) => a.status === "Absent",
  ).length;

  return (
    <div className="attendance-page">
      {/* HEADER */}
      <div className="attendance-header">
        <div>
          <h2>My Attendance</h2>
          <p>View and track your attendance records</p>
        </div>
      </div>

     

      {/* TABLE CARD */}
      <div className="table-card">
        <h3>Attendance Records</h3>

        {/* FILTER BAR */}
        <div className="attendance-filter-bar">
          <div className="attendance-filter-item">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="attendance-filter-item">
            <select
              value={searchStatus}
              onChange={(e) => {
                setSearchStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>CHECK IN</th>
              <th>CHECK OUT</th>
              <th>WORK HOURS</th>
              <th>OVERTIME</th>
              <th>STATUS</th>
              <th>NOTES</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAttendance.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.date)}</td>
                <td>{item.checkIn}</td>
                <td>{item.checkOut}</td>
                <td>{item.workHours}</td>
                <td>{item.overtime}</td>
                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="attendance-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
