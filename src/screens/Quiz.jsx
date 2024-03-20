import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import NavBar from "../ui-components/NavBar";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import moduleData from "../orientationModules.json"; // path to your JSON file
import {
  Drawer,
  Menu,
  Progress,
  Row,
  Col
} from "antd";

const Quiz = () => {
  // Assuming we're taking the quizList from the first module.
  const [answers, setAnswers] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const moduleName = location.state?.moduleName;
  const navigate = useNavigate(); // Instantiate useNavigate

  const onAnswerChange = (e, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    // console.log(answers);
    let completedModules = JSON.parse(localStorage.getItem("completedModules")) || [];
    if (!completedModules.includes(moduleName)) {
      completedModules.push(moduleName);
      localStorage.setItem("completedModules", JSON.stringify(completedModules));
    }
    navigate("/home"); // Add the navigate call to redirect to the home page
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">Module Quiz</h1>
        {moduleData[0].quizList.map((quizItem, index) => (
          <Card key={index} style={{ margin: "20px 0px" }}>
            <h3 className="header3">Question {index + 1}</h3>
            <p className="content">{quizItem.question}</p>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#9e2a2b",
                  borderRadius: 2,
                },
              }}
            >
              <Radio.Group
                onChange={(e) => onAnswerChange(e, index)}
                className="radio-custom"
              >
                <Space direction="vertical">
                  {quizItem.options.map((option, optionIndex) => (
                    <Radio className="content" key={optionIndex} value={option} style={{margin:"6px 0px"}}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </ConfigProvider>
          </Card>
        ))}
        <Button
          style={{
            backgroundColor: "#9E2A2B",
            borderColor: "#9E2A2B",
            color: "white",
            height: "40px",
            borderRadius: "100px",
          }}
          onClick={handleSubmit}
          block
        >
          <div className="buttonText">Submit</div>
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
