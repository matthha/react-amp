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
import { content } from "../JSONs/Modules";
import { useProgress } from "../ProgressContext";

const { Meta } = Card;
// Import other icons here if needed and use them as intended


const orientationModules = content;
function ProfilePage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const { completedModules, updateCompletedModules } = useProgress();
  const totalModules = orientationModules.length;
  const completionPercentage = Math.round(completedModules.length/totalModules * 100);
  console.log(completionPercentage)
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
      <NavBar />
      <div className="contentBody">
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Certification</h1>
        <div>
          <h3 className="header3" style={{paddingTop:25}}>GENERAL INFORMATION</h3>
          <div style={{paddingTop:20}}>
              <div className="profile-card" style={{marginBottom:25}}>
                  <h4 className="header4" style={{paddingBottom:5}}>USERNAME</h4>
                  <div className="profile-display">
                      {username}
                  </div>
              </div>
          </div>
        </div>
        <div>
          <h3 className="header3" style={{paddingTop:25}}>COMPLETION STATUS</h3>
          <div style={{paddingTop:20}}>
              {completionPercentage >= 100 ? (
                <div>
                  {/* <CheckCircleFilled style={{ color: "#299E63", fontSize: "24px" }} /> */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <img src="/images/badge.jpg" alt="Completed" 
                    style={{ width: "160px", height: "135px" }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',paddingTop:'20px' }}>
                      <span className='congratsTitle' style={{ marginLeft: "10px"}}>Congratulations!</span>
                      <span className='congratsContent' style={{ marginLeft: "10px"}}> You have completed all the modules!</span>
                    </div>
                  </div>
                  
                </div>
              ) : (
                <div>
                  <MinusCircleFilled style={{ color: "#C51C00", fontSize: "24px" }} />
                  <span style={{ marginLeft: "10px" }}>You have not completed all the modules yet.</span>
                </div>
              )}
            </div>
        </div>
        <div style={{paddingTop:'30px'}}>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
