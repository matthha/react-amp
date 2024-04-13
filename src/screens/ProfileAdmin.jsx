import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from "aws-amplify/auth";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import {
  Drawer,
  Menu,
  Card,
  Progress,
  Row,
  Col,
} from "antd";
import NavAdmin from "../ui-components/NavAdmin";
const { Meta } = Card;
// Import other icons here if needed and use them as intended



function ProfileAdmin(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.username);
        setUserEmail(user.email);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavAdmin />
      <div className="contentBody">
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Profile</h1>
        <h3 className="header3" style={{paddingTop:25}}>GENERAL INFORMATION</h3>
        <div style={{paddingTop:25}}>
            <div>
                <h4 className="header4" style={{paddingBottom:5}}>NAME</h4>
                <input 
                    defaultValue={username}
                    className="profile-input" 
                />
            </div>
            <div>
                <h4 className="header4" style={{paddingBottom:5}}>EMAIL</h4>
                <input 
                    defaultValue={email}
                    className="profile-input" 
                />
            </div>
        </div>
        <div style={{paddingTop:'40px'}}>
          <button style={{
              backgroundColor: "#9E2A2B",
              border: "none",
              color: "white",
              height: "40px",
              borderRadius: "100px",
              width: "350px"
            }}
                  onClick={props.signOut}>Sign out
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;
