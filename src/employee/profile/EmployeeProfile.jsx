import React, { useState } from "react";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Dropdown Data (Mapping Simulation)
  const departments = ["IT", "HR", "Finance", "Production", "Sales"];
  const managers = ["HR Manager", "Tech Lead", "Plant Head", "Admin Manager"];
  const employmentTypes = ["Permanent", "Contract", "Intern"];
  const branches = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

  const [profile, setProfile] = useState({
    name: "Bhuvanesh Kumar",
    designation: "Software Developer",
    employeeId: "EMP1024",
    department: "IT",
    manager: "Tech Lead",
    employmentType: "Permanent",
    branch: "Chennai",
    workLocation: "Chennai Plant 1",

    email: "bhuvanesh@gmail.com",
    phone: "+91 9876543210",
    dob: "2001-08-12",
    gender: "Male",
    address: "Salem, Tamil Nadu",

    joiningDate: "2024-01-10",
    probationStatus: "On Probation",
    confirmationStatus: "Pending",

    bank: "HDFC Bank",
    account: "XXXXXX4589",
    ifsc: "HDFC0001234",
    pan: "ABCDE1234F",

    qualification: "MCA",
    experience: "2 Years",
    skills: "React, Node.js, SQL, Python",

    emergencyName: "Ravi Kumar",
    emergencyRelation: "Father",
    emergencyPhone: "+91 9123456789",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully ✅");
  };

  const renderInput = (key, label, type = "text", options = null) => (
    <div>
      <label>{label}</label>
      {isEditing ? (
        options ? (
          <select name={key} value={profile[key]} onChange={handleChange}>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={key}
            value={profile[key]}
            onChange={handleChange}
          />
        )
      ) : (
        <p>{profile[key]}</p>
      )}
    </div>
  );

  return (
    <div className="profile-wrapper">
      {/* HEADER */}
      <div className="profile-header-card">
        <div className="profile-left">
          <div className="profile-avatar"></div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.designation}</p>
            <span>Employee ID: {profile.employeeId}</span>
            <div
              className={`status-badge ${profile.probationStatus === "Confirmed" ? "active" : "probation"}`}
            >
              {profile.probationStatus}
            </div>
          </div>
        </div>

        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-scroll">
        <div className="profile-grid">
          {/* PERSONAL INFO */}
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="info-grid">
              {renderInput("email", "Email")}
              {renderInput("phone", "Phone")}
              {renderInput("dob", "Date of Birth", "date")}
              {renderInput("gender", "Gender")}
              {renderInput("address", "Address")}
            </div>
          </div>

          {/* JOB DETAILS */}
          <div className="profile-card">
            <h3>Job & Employment</h3>
            <div className="info-grid">
              {renderInput("department", "Department", "text", departments)}
              {renderInput("manager", "Reporting Manager", "text", managers)}
              {renderInput(
                "employmentType",
                "Employment Type",
                "text",
                employmentTypes,
              )}
              {renderInput("branch", "Branch", "text", branches)}
              {renderInput("workLocation", "Work Location")}
              {renderInput("joiningDate", "Joining Date", "date")}
              {renderInput("confirmationStatus", "Confirmation Status")}
            </div>
          </div>

          {/* SKILL & EXPERIENCE */}
          <div className="profile-card">
            <h3>Skill Matrix & Experience</h3>
            <div className="info-grid">
              {renderInput("qualification", "Qualification")}
              {renderInput("experience", "Total Experience")}
              {renderInput("skills", "Technical Skills")}
            </div>
          </div>

          {/* BANK DETAILS */}
          <div className="profile-card">
            <h3>Bank Details</h3>
            <div className="info-grid">
              {renderInput("bank", "Bank Name")}
              {renderInput("account", "Account Number")}
              {renderInput("ifsc", "IFSC Code")}
              {renderInput("pan", "PAN Number")}
            </div>
          </div>

          {/* EMERGENCY CONTACT */}
          <div className="profile-card">
            <h3>Emergency Contact</h3>
            <div className="info-grid">
              {renderInput("emergencyName", "Name")}
              {renderInput("emergencyRelation", "Relationship")}
              {renderInput("emergencyPhone", "Contact Number")}
            </div>
          </div>
        </div>

        {/* DOCUMENT UPLOAD */}
        <div className="profile-card full-width">
          <h3>Uploaded Documents</h3>
          <input type="file" />
          <ul className="document-list">
            <li>
              PAN Card.pdf
              <button className="download-btn">Download</button>
            </li>
            <li>
              Aadhaar Card.pdf
              <button className="download-btn">Download</button>
            </li>
            <li>
              Degree Certificate.pdf
              <button className="download-btn">Download</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
