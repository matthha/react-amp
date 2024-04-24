import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import NavBar from "../components/NavBar";
import Content from "../components/Content";

// IntroductionVideo component displays introductory video and related content for a module
const IntroductionVideo = () => {
  // Use React Router's hooks for navigation and location to handle routing and access route state
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting module data from the location state
  const { module, myRecord } = location.state;
  const { title: moduleName } = module;

  // Scroll to top of the page on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler to navigate to the quiz page when user decides to start the quiz
  const handleStartQuiz = () => {
    navigate(`/quiz/${moduleName}`, { state: { module, myRecord } });
  };

  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body quiz-body">
        <h1 className="header1">{moduleName} Video</h1>
        <div className="secondary-text body-text-2">
        {/* Display estimated time for the video */}
          <ClockCircleOutlined /> {module.estimationTime} 
        </div>
        <div className="body-text-1">{module.description}</div>
        <div className="margin-vertical-small">
          <div className="responsive-iframe-container">
            {/* Embedded video player using iframe */}
            <iframe
              src={module.videoLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Display additional module content */}
        <Content content={module.content} />
        <div className="button-container">
          <Button
            className="action-button"
            block
            onClick={handleStartQuiz}
          >
            <div className="body-text-1">Start the quiz</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;
