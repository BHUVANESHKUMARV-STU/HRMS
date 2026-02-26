import "./EmployeeLeave.css";
import { useState, useMemo } from "react";

const EmployeeLeave = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  /* ================= EMPLOYEE LEAVE DATA ================= */
  const [myLeaves, setMyLeaves] = useState([
    {
      id: 1,
      type: "Casual Leave",
      duration: "15 Jun – 17 Jun",
      days: 3,
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick Leave",
      duration: "20 Jun – 21 Jun",
      days: 2,
      reason: "Not feeling well",
      status: "Approved",
    },
  ]);

  /* ================= FILTER STATES ================= */
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredLeaves = useMemo(() => {
    return myLeaves.filter(
      (item) =>
        (!filterType || item.type === filterType) &&
        (!filterStatus || item.status === filterStatus),
    );
  }, [myLeaves, filterType, filterStatus]);

  /* ================= PAGINATION ================= */
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const paginatedLeaves = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLeaves.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLeaves, currentPage]);

  /* ================= CANCEL LEAVE ================= */
  const cancelLeave = (id) => {
    setMyLeaves((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item,
      ),
    );
  };

  return (
    <div className="leave-page">
      {/* HEADER */}
      <div className="leave-header">
        <div>
          <h2>My Leave Portal</h2>
          <p>Apply and track your leave requests</p>
        </div>

        <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
          + Apply Leave
        </button>
      </div>

      {/* LEAVE BALANCE CARDS */}
      <div className="leave-stats">
        <div className="leave-card">
          <p className="card-label">Casual Leave</p>
          <h2 className="card-value">9</h2>
          <span className="card-meta">Used: 3 / Total: 12</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Sick Leave</p>
          <h2 className="card-value">8</h2>
          <span className="card-meta">Used: 2 / Total: 10</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Earned Leave</p>
          <h2 className="card-value">15</h2>
          <span className="card-meta">Used: 0 / Total: 15</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="leave-table-card">
        <h3>My Leave Requests</h3>
        <p className="sub-text">View your recent and past leave applications</p>

        {/* FILTER BAR */}
        <div className="leave-filter-bar">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Leave Types</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLeaves.map((req) => (
              <tr key={req.id}>
                <td>{req.type}</td>
                <td>{req.duration}</td>
                <td>{req.days}</td>
                <td>{req.reason}</td>
                <td>
                  <span
                    className={`status ${
                      req.status === "Pending"
                        ? "pending"
                        : req.status === "Approved"
                          ? "approved"
                          : req.status === "Rejected"
                            ? "rejected"
                            : "cancelled"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === "Pending" ? (
                    <button
                      className="reject"
                      onClick={() => cancelLeave(req.id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="leave-pagination">
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

      {/* APPLY MODAL */}
      {showApplyModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <button
              className="modal-close"
              onClick={() => setShowApplyModal(false)}
            >
              ✕
            </button>

            <h2>Apply for Leave</h2>

            <div className="modal-row">
              <label>Leave Type</label>
              <select>
                <option>Select leave type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>

            <div className="modal-row">
              <label>Start Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>End Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>Reason</label>
              <textarea />
            </div>

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
