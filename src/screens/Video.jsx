import React, { useState } from "react";
import NavBar from "../ui-components/NavBar";
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

const IntroductionVideo = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const module = location.state.module;
  const moduleName = location.state.module.title;
  const myRecord = location.state.myRecord;
  console.log(myRecord)
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate(`/quiz/${moduleName}`, { state: { module, myRecord } }); // Navigate to your quiz page route
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">{moduleName} Video</h1>
        <div className="secondaryContent" style={{ padding: "12px 0px" }}>
          <ClockCircleOutlined /> {moduleData[0].estimationTime}
        </div>
        <div className="buttonText">
          {moduleData[0].description}
        </div>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <video width="100%" controls>
            <source src={module.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* -- TODO -- Possibly add other learning content here on the same page -- */}

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

export default IntroductionVideo;
