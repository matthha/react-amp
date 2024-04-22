import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Progress, Tabs } from "antd";
import { content } from "../JSONs/Modules";
import { generateClient } from "aws-amplify/api";
import { adminInfo } from "../JSONs/adminInfo";

import { listProgresses } from "../graphql/queries";
import NavBar from "../ui-components/NavBar";

const orientationModules = content;

function HomeAdmin(props) {
  const [myRecords, setMyRecords] = useState([]);
  const [thePassed, setThePassed] = useState([]);
  const [theInProgress, setTheInProgress] = useState([]);

  const client = generateClient();

  const navigate = useNavigate();

  async function fetchProgress() {
    function CheckFinished(obj) {
      let progress = (JSON.parse(obj?.progress).length / totalModules) * 100;
      console.log(obj);
      console.log(adminInfo.adminUsername);
      //filter out if this is admin's progress
      return Number(progress) === 100 && obj.userID !== adminInfo.adminUsername;
    }
  
    function CheckInProgress(obj) {
      let progress = (JSON.parse(obj?.progress).length / totalModules) * 100;
      //filter out if this is admin's progress
      return Number(progress) !== 100 && obj.userID !== adminInfo.adminUsername;
    }
  
    function calculateProgress(obj) {
      return (JSON.parse(obj?.progress).length / totalModules) * 100;
    }
  
    // Try to get the progress
    try {
      const apiData = await client.graphql({ query: listProgresses });
  
      if (apiData.data.listProgresses.items.length !== 0) {
        setMyRecords(apiData.data.listProgresses.items);
  
        const comp = apiData.data.listProgresses.items.filter(CheckFinished);
        const prog = apiData.data.listProgresses.items.filter(CheckInProgress);
  
        // Sorting based on progress
        comp.sort((a, b) => calculateProgress(a) - calculateProgress(b));
        prog.sort((a, b) => calculateProgress(a) - calculateProgress(b));
  
        setThePassed(comp);
        setTheInProgress(prog);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    fetchProgress();
    window.scrollTo(0, 0);
  }, []);

  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div className="contentBody">
        <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
          <h1 className="header1">CCHS Online Orientation</h1>

          <div className="content paragraph">
            Hello, {props?.user.username} <br />
            Current user progress are below:
          </div>
          <Tabs
            defaultActiveKey="1"
            className="content"
            items={[
              {
                key: "1",
                label: `In Progress (${theInProgress.length})`,
                children: theInProgress.map((person, index) => (
                  <div key={index} className="content">
                    <h3>{person.userID}</h3>
                    <p>
                      Completed {JSON.parse(person?.progress).length} out of{" "}
                      {totalModules}
                    </p>
                    <Progress
                      percent={Math.round(
                        (JSON.parse(person?.progress).length / totalModules) *
                          100
                      )}
                    />
                  </div>
                )),
              },
              {
                key: "2",
                label: `Completed (${thePassed.length})`,
                children: thePassed.map((person, index) => (
                  <div key={index} className="content paragraph">
                    <h3>{person.userID}</h3>
                    <p>
                      Completed {JSON.parse(person?.progress).length} out of{" "}
                      {totalModules}
                    </p>
                    <Progress
                      percent={Math.round(
                        (JSON.parse(person?.progress).length / totalModules) *
                          100
                      )}
                    />
                  </div>
                )),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
