import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { useProgress } from "../ProgressContext";
import NavBar from "../components/NavBar";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { generateClient } from "aws-amplify/api";
import { updateProgress } from "../graphql/mutations";

const Quiz = (props) => {
  const { completedModules, updateCompletedModules } = useProgress();
  const [answers, setAnswers] = useState({});
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const client = generateClient();
  const variables = {
    filter: {
      userID: { eq: props.user.username },
    },
  };
  const moduleName = location.state.module.title;
  const module = location.state.module;
  const myRecord = location.state.myRecord;

  const navigate = useNavigate();

  async function updateOurProgress(newProgress) {
    try {
      const updatedProgress = await client.graphql({
        query: updateProgress,
        variables: {
          input: {
            id: `${myRecord}`,
            progress: `${newProgress}`,
          },
        },
      });
    } catch (error) {
      console.log("error is ", error);
    }
  }
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

  async function handleSubmit() {
    //calculate the total score
    const score = calculateScore(answers, module);
    //if the total score matches the total question number, it will mark as pass
    if (score >= module.scoreForPassing) {
      if (!completedModules.includes(moduleName)) {
        const newCompletedModules = [...completedModules, moduleName];
        await updateOurProgress(JSON.stringify(newCompletedModules));
        updateCompletedModules(newCompletedModules);
      }
    }
    navigate(`/result/${moduleName}`, { state: { module, answers, myRecord } }); // Navigate to your quiz page route
  }

  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body quiz-body">
        <h1 className="header1">{moduleName} Quiz</h1>
        {location.state.module.quizList.map((quizItem, index) => (
          <Card key={index} className="margin-top-medium">
            <h3 className="header3">Question {index + 1}</h3>
            <p className="body-text-2 padding-vertical-medium">
              {quizItem.question}
            </p>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#9e2a2b",
                  borderRadius: 2,
                },
              }}
            >
              <Radio.Group onChange={(e) => onAnswerChange(e, index)}>
                <Space direction="vertical">
                  {quizItem.options.map((option, optionIndex) => (
                    <Radio
                      className="body-text-2 margin-top-small"
                      key={optionIndex}
                      value={option}
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
