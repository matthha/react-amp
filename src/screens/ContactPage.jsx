import React from "react";
import NavBar from "../components/NavBar";
import { adminInfo } from "../JSONs/adminInfo";

function ContactPage() {
  const contactName = adminInfo.contactName;
  const contactEmail = adminInfo.contactEmail;
  const contactNumber = adminInfo.contactNumber;

  return (
    <div className="page-body">
      <NavBar /> {/*  Navigation bar at the top of the page */}
      <div className="content-body">
          <h1 className="header1">Contact Us</h1>
          <div>
            <p className="body-text-2" style={{ paddingTop: 16 }}>
              If you have any questions or problems, please contact us through
              email or give us a phone call.
            </p>
            <div
              style={{
                paddingTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div className="profile-card">
                <h4 className="body-text-2 bold">NAME</h4>
                <div className="profile-display">{contactName}</div>
              </div>
              <div className="profile-card">
                <h4 className="body-text-2 bold">EMAIL</h4>
                <div className="profile-display">{contactEmail}</div>
              </div>
              <div className="profile-card">
                <h4 className="body-text-2 bold">PHONE NUMBER</h4>
                <div className="profile-display">{contactNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ContactPage;
