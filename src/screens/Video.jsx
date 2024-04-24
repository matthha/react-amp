import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { Button } from "antd";
import {
  ClockCircleOutlined,
} from "@ant-design/icons";
import Content from "../components/Content";

const IntroductionVideo = () => {
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
    <div className="page-body">
      <NavBar />
      <div className="content-body quiz-body">
        <h1 className="header1">{moduleName} Video</h1>
        <div className="secondary-text body-text-2 video-time-container">
          <ClockCircleOutlined /> {module.estimationTime}
        </div>
        <div className="body-text-1">{module.description}</div>
        <div className="margin-vertical-small">
          <div className="responsive-iframe-container">
            <iframe
              src={module.videoLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <Content content={module.content}/>
        <div className="button-container">
          <Button
            className="action-button"
            block
            onClick={handleStartQuiz} // Attach the navigate function here
          >
            <div className="body-text-1 color-primary-3">Start the quiz</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;
