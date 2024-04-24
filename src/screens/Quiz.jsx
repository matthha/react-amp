import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProgress } from "../ProgressContext";
import NavBar from "../components/NavBar";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { generateClient } from "aws-amplify/api";
import { updateProgress } from "../graphql/mutations";

const Quiz = () => {
  const { completedModules, updateCompletedModules } = useProgress();
  const [answers, setAnswers] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to the top of the window when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const client = generateClient(); // Initialize AWS Amplify client
  const { module, myRecord } = location.state;
  const { title: moduleName } = module;

  // Handler to update progress in the backend
  async function updateOurProgress(newProgress) {
    try {
      await client.graphql({
        query: updateProgress,
        variables: {
          input: {
            id: myRecord,
            progress: newProgress,
          },
        },
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }

  // Handler for radio button changes
  const onAnswerChange = (e, questionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: e.target.value,
    }));
  };

  // Function to calculate the total score
  const calculateScore = () => {
    return module.quizList.reduce((score, quiz, index) => {
      return score + (answers[index] === quiz.correctAnswer ? 1 : 0);
    }, 0);
  };

  // Function to handle quiz submission
  async function handleSubmit() {
    const score = calculateScore();
    // Check if the score is sufficient for passing
    if (
      score >= module.scoreForPassing &&
      !completedModules.includes(moduleName)
    ) {
      const newCompletedModules = [...completedModules, moduleName];
      await updateOurProgress(JSON.stringify(newCompletedModules));
      updateCompletedModules(newCompletedModules);
    }
    navigate(`/result/${moduleName}`, { state: { module, answers, myRecord } });
  }

  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body quiz-body">
        <h1 className="header1">{moduleName} Quiz</h1>
        {module.quizList.map((quizItem, index) => (
          <Card key={index} className="margin-top-medium">
            <h3 className="header3">Question {index + 1}</h3>
            <p className="body-text-2 padding-vertical-medium">
              {quizItem.question}
            </p>
            <ConfigProvider
              theme={{ token: { colorPrimary: "#9e2a2b", borderRadius: 2 } }}
            >
              <Radio.Group onChange={(e) => onAnswerChange(e, index)}>
                <Space direction="vertical">
                  {quizItem.options.map((option, optionIndex) => (
                    <Radio
                      key={optionIndex}
                      value={option}
                      className="body-text-2 margin-top-small"
                    >
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </ConfigProvider>
          </Card>
        ))}
        <div className="button-container">
          <Button className="action-button" onClick={handleSubmit} block>
            <div className="body-text-1">Submit</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
