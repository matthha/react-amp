import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import NavBar from "../ui-components/NavBar";
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
import { generateClient } from "aws-amplify/api";
import { updateProgress } from "../graphql/mutations";

const Quiz = (props) => {
  const [answers, setAnswers] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const client = generateClient();
  const variables = {
    filter: {
      userID: { eq: props.user.username}
    }
  }
  const moduleName = location.state.module.title;
  const myRecord = location.state.myRecord;
  console.log(myRecord)
  // -- TODO -- We can instantiate an answer key here from ^module to use for scoring later --
  const navigate = useNavigate();

  async function updateOurProgress(newProgress) {
    // console.log(newProgress)
    try {

    const updatedProgress = await client.graphql({
      query: updateProgress,
      variables: {
        input: {
          "id": `${myRecord}`,
          "progress": `${newProgress}`
        }
          }
      });
      // console.log('updated is ', updatedProgress)
    } catch (error) {
      console.log('error is ', error)
    }
  }
  const onAnswerChange = (e, questionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: e.target.value,
    });
  };

  async function handleSubmit() {
    // --TODO -- Handle the submission logic here --
    // console.log(answers);
    let completedModules = JSON.parse(localStorage.getItem("completedModules")) || [];
    // let themods = (completedModules)
    // console.log('in quiz', typeof(completedModules))
    if (!completedModules.includes(moduleName)) {
      completedModules.push(moduleName);
      // -- TODO -- We can add the updateProgress function here --
      // console.log(typeof(completedModules))
      // I had to add await here because otherwise when it goes back home it would load the previous data before the data is updated and effect how it shows progress.
      await updateOurProgress(JSON.stringify(completedModules));
      localStorage.setItem("completedModules", JSON.stringify(completedModules));

      navigate("/home");
    }
    // -- TODO -- Add other logic here for pass/fail --

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
