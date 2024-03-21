import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";
import { parse } from 'yaml';
import text from '../YamlContent/Modules.yml'


// Import other icons here if needed and use them as intended
function Home(props) {
  const [username, setUsername] = useState(null);
  const [orientationModules, setOrientationModules] = useState([])
  const [content, setContent] =useState([])

  const navigate = useNavigate();
  const handleCardClick = (module) => {
    navigate(`/video`, { state: { module } });
  };
  
  useEffect(() => {
    // For reading the YAML Files
    fetch(text)
    .then(r => r.text())
    .then(texts => parse(texts))
    .then(cons => setOrientationModules(cons))

  }, []);

  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;
  // const completedModules = orientationModules.filter(
  //   (module) => module.completed
  // ).length;
  const completionPercentage = (totalModules) * 100;
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">CCHS Online Orientation</h1>
        <div className="content paragraph">
          Hello, {props?.user.username} <br />
          Your current orientation progress:
        </div>
        <Progress strokeColor="#299E63" percent={completionPercentage} />
        <h2 className="header2" style={{ marginTop: 16, marginBottom: 16 }}>
          Orientation Modules
        </h2>
        <Row gutter={[16, 16]}>
          {orientationModules.map((module, index) => (
            <Col span={12} key={index}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    style={{ height: 164, objectFit: "cover" }}
                    alt="example"
                    src={module.coverImg}
                  />
                }
                onClick={() => handleCardClick(module)}
              >
                <div className="card-body">
                  <div className="content">{module.title}</div>
                  <div className="secondaryContent">
                    {module.estimationTime}
                  </div>

                  {module.completed && (
                    <div className="status-card content">
                      <CheckCircleFilled style={{ color: "#299E63" }} />
                      Completed
                    </div>
                  )}
                  {!module.completed && (
                    <div className="status-card content">
                      <MinusCircleFilled style={{ color: "#C51C00" }} />
                      Incomplete
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
