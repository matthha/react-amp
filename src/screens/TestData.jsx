import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import {
  Drawer,
  Menu,
  Card,
  Progress,
  Row,
  Col,
} from "antd";
// import { generateClient } from "aws-amplify/api";
import { listProgresss, getProgress } from "../graphql/queries";

// const client = generateClient()
const { Meta } = Card;
// Import other icons here if needed and use them as intended
function TestData(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [myProgress, setMyProgress] = useState({"Attendance":"no"})

  useEffect(()=> {
   fetchProgress();
  }, []);

   async function fetchProgress() {
   
   
      // Get a specific item
      const oneProgress = await props.client.graphql({
         query: getProgress,
         variables: { userID: props.user.username }
      });
      console.log(oneProgress)
   }
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <div
        style={{
          background: "#9E2A2B",
          height: 60,
          paddingLeft: 16,
          paddingTop: 20,
        }}
        className="menuicon"
      >
        <MenuOutlined
          style={{ color: "white", fontSize: 20 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="headerMenu">
        <AppMenu />
      </span>
      <Drawer
        placement="left"
        visible={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        style={{ backgroundColor: "white" }}
      >
        <AppMenu isInline={true} />
      </Drawer>

      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">CCHS Online Orientation</h1>
        <div className="content paragraph">
          Hello, Alison <br />
          Your current orientation progress:
        </div>
        <Progress strokeColor="#299E63" percent={30} />
        <h2 className="header2" style={{ marginTop: 16, marginBottom: 16 }}>
          Orientation Modules
        </h2>
        <Row gutter={[16, 16]}>
        <Card>Stuff Here {JSON.stringify(props.user)}</Card>
        </Row>
      </div>
    </div>
  );
}

function AppMenu({ isInline = false }) {
  // Corrected parameter destructuring
  return (
    <Menu
      style={{ backgroundColor: "white", fontSize: 20, border: "none" }}
      mode={isInline ? "inline" : "horizontal"}
      items={[
        {
          label: "CCHS Online Orientation",
          key: "home", // Corrected property name to lowercase
        },
        {
          label: "Orientation Recap",
          key: "recap",
        },
        {
          label: "FAQ",
          key: "faq",
        },
        {
          label: "Profile",
          key: "profile",
        },
      ]}
    ></Menu>
  );
}

export default TestData;