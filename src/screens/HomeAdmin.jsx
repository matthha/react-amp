import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col, Tabs } from "antd";
import { content } from "../JSONs/Modules";
import { generateClient } from "aws-amplify/api";
import { createProgress, updateProgress } from "../graphql/mutations";
import { listProgresses } from "../graphql/queries";

const orientationModules = content;

function HomeAdmin(props) {
  // completedModules is an Array of title the user has passed
  // let completedModules = JSON.parse(localStorage.getItem("completedModules")) || []; 
  // console.log('saved modules are: ',completedModules)
  const [myRecords, setMyRecords] = useState([]);
  const [thePassed, setThePassed] = useState([]);
  const [theInProgress, setTheInProgress] = useState([]);

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



  async function fetchProgress() {
    function CheckFinished(obj) {
      let progress = JSON.parse(obj?.progress).length/totalModules*100;
      // console.log('my progress is', progress)
      if (Number(progress) == '100') {
        // console.log('true');
      return true } else { return false}
    }
    function CheckInProgress(obj) {
      let progress = JSON.parse(obj?.progress).length/totalModules*100;
      // console.log('my progress is', progress)
      if (Number(progress) != '100') {
        // console.log('true');
      return true } else { return false }
    }
    // * Try to get the progress
    try{
    const apiData = await client.graphql({ query: listProgresses });

    if (apiData.data.listProgresses.items.length === 0 ) {

    } else {
      setMyRecords(apiData.data.listProgresses.items)


      const comp = apiData.data.listProgresses.items.filter(CheckFinished)
      const prog = apiData.data.listProgresses.items.filter(CheckInProgress)
      // const failed= myRecords.filter(CheckFinished)
      // console.log(failed)
      // console.log('comp is',comp)
      setThePassed(comp)
      setTheInProgress(prog)
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
  // const completionPercentage = completedModules.length/totalModules * 100;
  // console.log(myRecords)

  // const passed = myRecords.filter(CheckFinished);
  // const failed = myRecords.filter(!CheckFinished);

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavBar />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">CCHS Online Orientation</h1>

        <div className="content paragraph">
          Hello, {props?.user.username} <br />
          Current enrollments are below: 
        </div>
        <Tabs defaultActiveKey="1" items={
          [{key:'1',label:'In Progress',children: theInProgress.map((person, index) => (
            
            <div key={index} className="content paragraph">
              <h3>{person.userID}</h3>
              <p>Completed {JSON.parse(person?.progress).length} out of {totalModules}</p>
              <Progress percent={JSON.parse(person?.progress).length/totalModules*100}/>
            </div>
        ))},{key:'2',label:'Completed',children: thePassed.map((person, index) => (
          <div key={index} className="content paragraph">
            <h3>{person.userID}</h3>
            <p>Completed {JSON.parse(person?.progress).length} out of {totalModules}</p>
            <Progress percent={JSON.parse(person?.progress).length/totalModules*100}/>
          </div>
      ))}]} />
        
      </div>
    </div>
  );
}

export default HomeAdmin;
