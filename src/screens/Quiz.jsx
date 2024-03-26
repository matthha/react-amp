import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import NavBar from "../ui-components/NavBar";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import moduleData from "../orientationModules.json"; // path to your JSON file
import { Drawer, Menu, Progress, Row, Col } from "antd";

const Quiz = (props) => {
  const [answers, setAnswers] = useState({});
  const location = useLocation();
  const module = location.state?.module ?? {};
  const moduleName = location.state?.module?.title ?? "Unknown Module";
  // -- TODO -- We can instantiate an answer key here from ^module to use for scoring later --
  const navigate = useNavigate();

  const onAnswerChange = (e, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: e.target.value,
    });
  };
  const calculateScore = (answers, module) => {
    let score = 0;
    // Loop through each question in the module's quizList
    module.quizList.forEach((quiz, index) => {
      // Check if the user's answer matches the correct answer
      const correctAnswer = quiz.correctAnswer;
      if (answers[index] === correctAnswer) {
        score += 1; // Increment the score for each correct answer
      }
    });

    return score;
  };

  const handleSubmit = () => {
    // --TODO -- Handle the submission logic here --
    // console.log(answers);
    //calculate the total score
    const score = calculateScore(answers, module);
    //if the total score matches the total question number, it will mark as pass
    if (score === module.quizList.length) {
      let completedModules =
        JSON.parse(localStorage.getItem("completedModules")) || [];
      if (!completedModules.includes(moduleName)) {
        completedModules.push(moduleName);
        // -- TODO -- We can add the updateProgress function here --
        localStorage.setItem(
          "completedModules",
          JSON.stringify(completedModules)
        );
      }
    }
    // -- TODO -- Add other logic here for pass/fail --
    navigate(`/result/${moduleName}`, { state: { module, answers } }); // Navigate to your quiz page route
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">{moduleName} Quiz</h1>
        {location.state.module.quizList.map((quizItem, index) => (
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
                    <Radio
                      className="content"
                      key={optionIndex}
                      value={option}
                      style={{ margin: "6px 0px" }}
                    >
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
