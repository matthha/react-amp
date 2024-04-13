import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Progress, Tabs } from "antd";
import { content } from "../JSONs/Modules";
import { generateClient } from "aws-amplify/api";

import { listProgresses } from "../graphql/queries";
import NavAdmin from "../ui-components/NavAdmin";

const orientationModules = content;

function HomeAdmin(props) {

  const [myRecords, setMyRecords] = useState([]);
  const [thePassed, setThePassed] = useState([]);
  const [theInProgress, setTheInProgress] = useState([]);

  const client = generateClient();

  const navigate = useNavigate();



  async function fetchProgress() {
    function CheckFinished(obj) {
      let progress = JSON.parse(obj?.progress).length/totalModules*100;

      if (Number(progress) === 100) {

      return true } else { return false}
    }
    function CheckInProgress(obj) {
      let progress = JSON.parse(obj?.progress).length/totalModules*100;

      if (Number(progress) !== 100) {

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

      setThePassed(comp)
      setTheInProgress(prog)
    }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    fetchProgress();
    window.scrollTo(0, 0)
  }, []);
  
  // The following is for calculating completion Percentage
  const totalModules = orientationModules.length;

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <NavAdmin />
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">CCHS Online Orientation</h1>

        <div className="content paragraph">
          Hello, {props?.user.username} <br />
          Current enrollments are below: 
        </div>
        <Tabs defaultActiveKey="1" items={
          [{key:'1',label:`In Progress (${theInProgress.length})`,children: theInProgress.map((person, index) => (
            
            <div key={index} className="content paragraph">
              <h3>{person.userID}</h3>
              <p>Completed {JSON.parse(person?.progress).length} out of {totalModules}</p>
              <Progress percent={Math.round(JSON.parse(person?.progress).length/totalModules*100)}/>
            </div>
        ))},{key:'2',label:`Completed (${thePassed.length})`,children: thePassed.map((person, index) => (
          <div key={index} className="content paragraph">
            <h3>{person.userID}</h3>
            <p>Completed {JSON.parse(person?.progress).length} out of {totalModules}</p>
            <Progress percent={Math.round(JSON.parse(person?.progress).length/totalModules*100)}/>
          </div>
      ))}]} />
        
      </div>
    </div>
  );
}

export default HomeAdmin;
