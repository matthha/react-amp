import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import ResultCard from "../components/ResultCard";
import { Button } from "antd";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scrolls to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Retrieve the necessary state from the previous route
  const module = location.state?.module ?? {};
  const moduleName = module.title ?? "Unknown Module";
  const answers = location.state?.answers || {};
  const myRecord = location.state.myRecord;
  const quizList = module.quizList;

  // Function to calculate the score based on correct answers
  const calculateScore = () => {
    return quizList.reduce(
      (acc, quiz, index) =>
        acc + (answers[index] === quiz.correctAnswer ? 1 : 0),
      0
    );
  };

  const score = calculateScore();
  const totalQuestion = quizList.length;

  // Function to navigate back to the quiz page to retake the quiz
  const handleTakeAgain = () => {
    navigate(`/quiz/${moduleName}`, { state: { module, myRecord } });
  };

  // Function to navigate back to the home page
  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body quiz-body">
        <h1 className="header1">Quiz Result</h1>
        <p className="body-text-2 secondary-text margin-bottom-small">
          {moduleName} Module
        </p>
        {score >= module.scoreForPassing ? (
          <div>
            <h3 className="header3">
              Your Score for this attempt:{" "}
              <span className="color-semantic-green">{score}</span>/
              {totalQuestion}{" "}
            </h3>
            <p className="body-text-2 margin-top-small margin-bottom-medium">
              Congras! You have completed this Module!
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                className="result-img"
                src="/images/Congrats.png"
                alt="congrats on finishing the module!"
              />
            </div>
            <div className="button-container">
              <Button className="action-button" onClick={handleBackHome} block>
                <div className="body-text-1">Back to Home</div>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="header3">
              Your Score for this attempt:{" "}
              <span className="color-semantic-red">{score}</span>/
              {totalQuestion}{" "}
            </h3>
            <p className="body-text-2 margin-top-small margin-bottom-medium">
              For this quiz, you will have unlimited attempts, but need to get{" "}
              {module.scoreForPassing}/{totalQuestion} to complete this module.
            </p>
            <div className="button-container">
              <Button className="action-button" onClick={handleTakeAgain} block>
                <div className="body-text-1">Take the Quiz Again</div>
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
