import React from "react";
import { Card, Radio, Alert, Space } from "antd";

const ResultCard = ({ index, question, userAnswer, correctAnswer, options }) => {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <Card style={{ margin: "20px 0px" }}>
      <div className="question-header">
        <h3 className="header3">Question {index+1}</h3>
        {isCorrect ? (
          <Alert
            className="alert-inline"
            message="Correct"
            type="success"
            showIcon
          />
        ) : (
          <Alert
            className="alert-inline"
            message="Incorrect"
            type="error"
            showIcon
          />
        )}
      </div>
      <p className="content quizQuestion">{question}</p>
      <Radio.Group value={userAnswer} disabled>
        {/* Map over the options here */}
        <Space direction="vertical">
          {options.map((option, optionIndex) => (
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
    </Card>
  );
};

export default ResultCard;
