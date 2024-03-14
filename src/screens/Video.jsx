import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import {
  Drawer,
  Menu,
  Card,
  Progress,
  Row,
  Col, Button, Divider
} from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import moduleData from "../orientationModules.json";

const IntroductionVideo = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const moduleName = location.state?.module.title;
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate("/quiz", { state: { moduleName } }); // Navigate to your quiz page route
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <div
        style={{
          background: "#9E2A2B",
          height: "auto",
          padding: "24px 16px",
        }}
        className="menuicon"
      >
        <MenuOutlined
          style={{ color: "white", fontSize: 20 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="headerMenu">
        <AppMenu />
      </span>
      <Drawer
        placement="left"
        visible={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        style={{ backgroundColor: "white" }}
      >
        <AppMenu isInline={true} />
      </Drawer>
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Introduction Video</h1>
        <div className="secondaryContent" style={{ padding: "12px 0px" }}>
          <ClockCircleOutlined /> {moduleData[0].estimationTime}
        </div>
        <div className="buttonText">
          {moduleData[0].description}
        </div>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <video width="100%" controls>
            <source src={moduleData[0].videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <Button
          style={{
            backgroundColor: "#9E2A2B",
            borderColor: "#9E2A2B",
            color: "white",
            margin: 10,
            height: "40px",
            borderRadius: "100px",
          }}
          block
          onClick={handleStartQuiz} // Attach the navigate function here
        >
          <div className="buttonText">Start the quiz</div>
        </Button>
      </div>
    </div>
  );
};

function AppMenu({ isInline = false }) {
  // Corrected parameter destructuring
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/${e.key}`);
  };
 
  return (
    <Menu
      style={{ backgroundColor: "white", fontSize: 20, border: "none" }}
      mode={isInline ? "inline" : "horizontal"}
      onClick={handleClick}
      items={[
        {
          label: "CCHS Online Orientation",
          key: "home", // Corrected property name to lowercase
        },
        {
          label: "Orientation Recap",
          key: "recap",
        },
        {
          label: "FAQ",
          key: "faq",
        },
        {
          label: "Profile",
          key: "profile",
        },
      ]}
    ></Menu>
  );
}

export default IntroductionVideo;
