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

const Result = () => {
  const [answers, setAnswers] = useState({});
  //TODO: change this to the quiz page passed value
  const location = useLocation();
  const moduleName = content[0].title;
  // -- TODO -- We can instantiate an answer key here from ^module to use for scoring later --
  const navigate = useNavigate();
  const results = [
    {
      question: "When is a student first considered truant?",
      options: [
        "5th unexcused absence",
        "3rd unexcused absence",
        "Students are considered truant if they miss the first or last day of school",
      ],
      userAnswer: "3rd unexcused absence",
      correctAnswer: "3rd unexcused absence",
    },
    {
      question: "What is the capital of France?",
      options: ["Rome", "Paris", "Madrid"],
      userAnswer: "Paris",
      correctAnswer: "Paris",
    },
    // ... more questions
  ];
  const score = results.reduce((acc, current) => {
    return acc + (current.userAnswer === current.correctAnswer ? 1 : 0);
  }, 0);
  const totalQuestion = results.length;

  const onAnswerChange = (e, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: e.target.value,
    });
  };

  const handleTakeAgain = () => {};

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
                onClick={handleTakeAgain}
                block
              >
                <div className="buttonText">Next Module</div>
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
          {results.map((result, index) => (
            <ResultCard
              key={index}
              index={index}
              question={result.question}
              userAnswer={result.userAnswer}
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
