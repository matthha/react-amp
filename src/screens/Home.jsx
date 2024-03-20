import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";
import { getCurrentUser } from "aws-amplify/auth";
const { Meta } = Card;

// Import other icons here if needed and use them as intended
function Home(props) {
  const [username, setUsername] = useState(null);
  const [orientationModules, setOrientationModules] = useState([
    {
      title: "Dress Code",
      estimationTime: "~10 mins",
      completed: false,
      coverImg:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Attendence",
      estimationTime: "~10 mins",
      completed: false,
      coverImg:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Career",
      estimationTime: "~10 mins",
      completed: false,
      coverImg:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Orientation Video",
      estimationTime: "~10 mins",
      completed: false,
      coverImg:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  const navigate = useNavigate();
  const handleCardClick = (module) => {
    navigate(`/video`, { state: { module } });
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();
        setUsername(user.username);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();

    const completedModules =
      JSON.parse(localStorage.getItem("completedModules")) || [];
    setOrientationModules((prevModules) => {
      return prevModules.map((module) => ({
        ...module,
        completed: completedModules.includes(module.title),
      }));
    });
  }, []);

  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;
  const completedModules = orientationModules.filter(
    (module) => module.completed
  ).length;
  const completionPercentage = (completedModules / totalModules) * 100;
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
