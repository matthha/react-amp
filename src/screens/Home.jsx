import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";
import { content } from "../JSONs/Modules";
import { generateClient } from "aws-amplify/api";
import { createProgress, updateProgress } from "../graphql/mutations";
import { listProgresses } from "../graphql/queries";

const orientationModules = content;

function Home(props) {
  // completedModules is an Array of title the user has passed
  let completedModules = JSON.parse(localStorage.getItem("completedModules")) || []; 
  // console.log('saved modules are: ',completedModules)
  const [myRecord, setMyRecord] = useState('');
  const client = generateClient();
  // variables used so we only get our progress from listProgresses in fetchProgress
  const variables = {
    filter: {
      userID: { eq: props.user.username}
    }
  }
  // Used to initialize the user's progress
  // AWS needs the stringified version of progress for AWSJSON object to store it
  const newUser = { 'userID': `${props.user.username}`, 'progress': JSON.stringify([]) }

  const navigate = useNavigate();
  const handleCardClick = (module) => {
    navigate(`/video/${module.title}`, { state: { module, myRecord } });
  };


  async function fetchProgress() {
    let tempUser = '';
    // * Try to get the progress
    try{
    const apiData = await client.graphql({ query: listProgresses, variables: variables });

    // console.log('We checked here for user data',apiData)
      // * apiData should be a length of 1
      // * if apiData not == 1, need to create user data
    if (apiData.data.listProgresses.items.length == 0 ) {
      // console.log('No data; making progress for ', props.user.username);
      try {
      const newerrr = await client.graphql({
        query: createProgress,
        variables: {
            input: newUser
        }
      });
      // console.log('new user is created', newerrr)
      setMyRecord(newerrr.data.createProgress.id)
    } catch (error) {
      console.log(error)
    }

    } else {
      setMyRecord(apiData.data.listProgresses.items[0].id)
      console.log('my progress is',apiData.data.listProgresses.items[0].progress)
      localStorage.setItem("completedModules", apiData.data.listProgresses.items[0].progress);
    }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
// -- TODO -- We need to load user's progress and make sure it's synced with completedModules or initialize it -- 
    fetchProgress();

  }, []);
  
  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;
  const completionPercentage = completedModules.length/totalModules * 100;

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">CCHS Online Orientation</h1>

        <div className="content paragraph">
          Hello, {props?.user.username} <br />
          Your current orientation progress: 
        </div>
        <Progress strokeColor="#299E63" percent={completionPercentage} />

        <h2 className="header2" style={{ marginTop: 16, marginBottom: 16 }}>
          Orientation Modules
        </h2>
        <Row gutter={[16, 16]}>
          {/* This is where the modules are being loaded */}
          {Array.isArray(orientationModules) &&
            orientationModules.map((module, index) => (
              <Col span={12} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      style={{ height: 164, objectFit: "cover" }}
                      alt="example"
                      src={module?.coverImg}
                    />
                  }
                  onClick={() => handleCardClick(module)}
                >
                  <div className="card-body">
                    <div className="content">{module.title}</div>
                    <div className="secondaryContent">
                      {module.estimationTime}
                    </div>

                    {completedModules.includes(module.title) && (
                      <div className="status-card content">
                        <CheckCircleFilled style={{ color: "#299E63" }} />
                        Completed
                      </div>
                    )}
                    {!completedModules.includes(module.title) && (
                      <div className="status-card content">
                        <MinusCircleFilled style={{ color: "#C51C00" }} />
                        Incomplete
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
