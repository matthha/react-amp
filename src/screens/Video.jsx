import React from "react";
import { Card, Button, Divider } from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import moduleData from "../orientationModules.json";

const IntroductionVideo = () => {
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
        <MenuOutlined style={{ color: "white", fontSize: 20 }} />
      </div>
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
        >
          <div className="buttonText">Start the quiz</div>
        </Button>
      </div>
    </div>
  );
};

export default IntroductionVideo;
