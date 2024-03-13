import React, { useState } from "react";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import moduleData from "../orientationModules.json"; // path to your JSON file

const Quiz = () => {
  // Assuming we're taking the quizList from the first module.
  const [answers, setAnswers] = useState({});

  const onAnswerChange = (e, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Here you would handle submission, e.g., send answers to an API or compare with correct answers
    console.log(answers);
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
        <MenuOutlined style={{ color: "white", fontSize: 20 }} />
      </div>
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
