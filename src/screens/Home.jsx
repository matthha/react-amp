import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Card, Progress, Row, Col } from "antd";
import { content } from "../JSONs/Modules";
import { generateClient } from "aws-amplify/api";
import {
  createProgress,
} from "../graphql/mutations";
import { listProgresses } from "../graphql/queries";
import { useProgress } from "../ProgressContext";

const orientationModules = content;

function Home(props) {
  // completedModules is an Array of title the user has passed
  const { completedModules, updateCompletedModules } = useProgress();
  // console.log('saved modules are: ',completedModules)
  const [myRecord, setMyRecord] = useState("");
  const client = generateClient();
  // variables used so we only get our progress from listProgresses in fetchProgress
  const variables = {
    filter: {
      userID: { eq: props.user.username },
    },
  };
  // Used to initialize the user's progress
  // AWS needs the stringified version of progress for AWSJSON object to store it
  const newUser = {
    userID: `${props.user.username}`,
    progress: JSON.stringify([]),
  };

  const navigate = useNavigate();
  const handleCardClick = (module) => {
    navigate(`/video/${module.title}`, { state: { module, myRecord } });
  };

  async function fetchProgress() {
    // * Try to get the progress
    try {
      const apiData = await client.graphql({
        query: listProgresses,
        variables: variables,
      });

      // console.log('We checked here for user data',apiData)
      // * apiData should be a length of 1
      // * if apiData not == 1, need to create user data
      if (apiData.data.listProgresses.items.length == 0) {
        try {
          const newerrr = await client.graphql({
            query: createProgress,
            variables: {
              input: newUser,
            },
          });
          // console.log('new user is created', newerrr)
          setMyRecord(newerrr.data.createProgress.id);
        } catch (error) {
          console.log(error);
        }
      } else {
        setMyRecord(apiData.data.listProgresses.items[0].id);
        updateCompletedModules(
          JSON.parse(apiData.data.listProgresses.items[0].progress)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProgress();
  }, []);

  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;
  const completionPercentage = Math.round(
    (completedModules.length / totalModules) * 100
  );

  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body">
        <h1 className="header1">CCHS Online Orientation</h1>
        <div className="body-text-2 margin-top-medium">
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
              <Col xs={12} sm={12} md={12} lg={8} xl={8} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      className="cover-img"
                      alt="cover image for each learning modules"
                      src={module?.coverImg}
                      loading="lazy"
                    />
                  }
                  onClick={() => handleCardClick(module)}
                >
                  <div className="card-body">
                    <div className="body-text-2 semibold">{module.title}</div>
                    <div className="body-text-3 secondary-text">
                      {module.estimationTime}
                    </div>

                    <div className="status-card body-text-3">
                      {completedModules.includes(module.title) ? (
                        <>
                          <CheckCircleFilled style={{ color: "#299E63" }} />
                          Completed
                        </>
                      ) : (
                        <>
                          <MinusCircleFilled style={{ color: "#C51C00" }} />
                          Incomplete
                        </>
                      )}
                    </div>
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
