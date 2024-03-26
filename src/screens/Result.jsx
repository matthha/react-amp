import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import NavBar from "../ui-components/NavBar";
import ResultCard from "../ui-components/ResultCard";
import { Card, Radio, Button, Space, ConfigProvider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import moduleData from "../orientationModules.json"; // path to your JSON file
import { Drawer, Menu, Progress, Row, Col } from "antd";

//Delete this after
import { content } from "../JSONs/Modules";

const Result = (props) => {
  //TODO: change this to the quiz page passed value
  const location = useLocation();
  const module = location.state?.module ?? {};
  const moduleName = location.state?.module?.title ?? "Unknown Module";
  const answers = location.state?.answers || {};
  const quizList = module.quizList;
  console.log(answers);
  console.log(module);
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
  const navigate = useNavigate();

  const score = calculateScore(answers, module);
  const totalQuestion = quizList.length;

  const handleTakeAgain = () => {
    navigate(`/quiz/${moduleName}`, { state: { module } }); // Navigate to your quiz page route
  };
  const handlebackhome = () => {
    //TODO
    //handle the logic to move to the next module
    navigate(`/home`); 
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1" style={{ marginBottom: "12px" }}>
          {moduleName} Quiz Result
        </h1>

        {score === totalQuestion ? (
          <div>
            <h3 className="header3">
              Your Score for this attempt:{" "}
              <span style={{ color: "#299E63" }}>{score}</span>/{totalQuestion}{" "}
            </h3>
            <p
              className="content"
              style={{ marginTop: "8px", marginBottom: 20 }}
            >
              Congras! You have completed this Module!
            </p>
            <div style={{ width: "100%" }}>
              <img
                style={{ width: "100%", marginBottom: 8 }}
                src="/images/Congrats.png"
                alt="congrats on finishing the module!"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#9E2A2B",
                  borderColor: "#9E2A2B",
                  color: "white",
                  height: "40px",
                  borderRadius: "100px",
                  width: "auto",
                  alignItems: "center",
                  padding: "8px 28px",
                  minWidth: 212,
                }}
                onClick={handlebackhome}
                block
              >
                <div className="buttonText">Back to Home</div>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="header3">
              Your Score for this attempt:{" "}
              <span style={{ color: "#C51C00" }}>{score}</span>/{totalQuestion}{" "}
            </h3>
            <p
              className="content"
              style={{ marginTop: "8px", marginBottom: 20 }}
            >
              For this quiz, you will have unlimited attempts, but need to get
              10/10 to complete this module.
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#9E2A2B",
                  borderColor: "#9E2A2B",
                  color: "white",
                  height: "40px",
                  borderRadius: "100px",
                  width: "auto",
                  alignItems: "center",
                  padding: "8px 28px",
                  minWidth: 212,
                }}
                onClick={handleTakeAgain}
                block
              >
                <div className="buttonText">Take the Quiz Again</div>
              </Button>
            </div>
          </div>
        )}

        <div>
          {quizList.map((result, index) => (
            <ResultCard
              key={index}
              index={index}
              question={result.question}
              userAnswer={answers[index]}
              correctAnswer={result.correctAnswer}
              options={result.options}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
