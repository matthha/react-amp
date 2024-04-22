import React, { useEffect, useState } from "react";
import NavBar from "../ui-components/NavBar";
import { adminInfo } from "../JSONs/adminInfo";
import { getCurrentUser } from "aws-amplify/auth";

function ContactPage() {
  const contactName = adminInfo.contactName;
  const contactEmail = adminInfo.contactEmail;
  const contactNumber = adminInfo.contactNumber;

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <div style={{ height: "100vh", backgroundColor: "whit" }}>
        <NavBar />
        <div className="contentBody">
          <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
            <h1 className="header1">Contact Us</h1>
            <div>
              <p className="content" style={{ paddingTop: 16 }}>
                If you have any questions or problems, please contact us through
                email or give us a phone call.
              </p>
              <div style={{ paddingTop: 20, display:"flex", flexDirection:"column", gap:"20px" }}>
                <div className="profile-card" >
                  <h4 className="header4" >
                    NAME
                  </h4>
                  <div className="profile-display">{contactName}</div>
                </div>
                <div className="profile-card">
                  <h4 className="header4">
                    EMAIL
                  </h4>
                  <div className="profile-display">{contactEmail}</div>
                </div>
                <div className="profile-card">
                  <h4 className="header4" >
                    PHONE NUMBER
                  </h4>
                  <div className="profile-display">{contactNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
