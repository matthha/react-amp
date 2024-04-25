import React from "react";
import { Card, Radio, Alert, Space } from "antd";

/**
 * ResultCard displays a question, its options, and whether the user's answer was correct or incorrect.
 * 
 * Props:
 * - index: Index of the current question in the quiz
 * - question: The text of the question
 * - userAnswer: The answer submitted by the user
 * - correctAnswer: The correct answer to the question
 * - options: Array of possible answers for the question
 */
const ResultCard = ({
  index,
  question,
  userAnswer,
  correctAnswer,
  options,
}) => {
  // Determine if the user's answer matches the correct answer
  const isCorrect = userAnswer === correctAnswer;

  return (
    <Card className="margin-vertical-medium padding-bottom-small">
      <div className="question-header">
        <h3 className="header3">Question {index + 1}</h3>
        {isCorrect ? (
          // Display a success alert if the answer is correct
          <Alert
            className="alert-inline body-text-3"
            message="Correct"
            type="success"
            showIcon
          />
        ) : (
          // Display an error alert if the answer is incorrect
          <Alert
            className="alert-inline body-text-3"
            message="Incorrect"
            type="error"
            showIcon
          />
        )}
      </div>
      <p className="body-text-2 margin-vertical-small">{question}</p>
      {/* Radio group for displaying the options with the user's selected answer */}
      <Radio.Group value={userAnswer} disabled>
        <Space direction="vertical">
          {options.map((option, optionIndex) => (
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
    </Card>
  );
};

export default ResultCard;
