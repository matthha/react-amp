import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
    navigate("/home"); // Add the navigate call to redirect to the home page
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

export default Quiz;
