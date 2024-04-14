import React, { useEffect, useState } from "react";
import NavBar from "../ui-components/NavBar";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { Drawer, Menu, Card, Progress, Row, Col, Button, Divider } from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import moduleData from "../orientationModules.json";
import Content from "../ui-components/Content";

const IntroductionVideo = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const module = location.state.module;
  const moduleName = location.state.module.title;
  const myRecord = location.state.myRecord;
  useEffect(()=> {window.scrollTo(0, 0)},[])
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate(`/quiz/${moduleName}`, { state: { module, myRecord } }); // Navigate to your quiz page route
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div className="contentBody quizBody videoBody">
        <h1 className="header1">{moduleName} Video</h1>
        <div className="secondaryContent videoTimeContainer">
          <ClockCircleOutlined className="secondaryContent" /> {module.estimationTime}
        </div>
        <div className="buttonText">{module.description}</div>
        <div className="videoContainer">
          <div className="responsive-iframe-container">
            <iframe
              src={module.videoLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <Content content={module.content}/>
        <div className="buttonContainer">
          <Button
            className="actionButton"
            block
            onClick={handleStartQuiz} // Attach the navigate function here
          >
            <div className="buttonText">Start the quiz</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;
