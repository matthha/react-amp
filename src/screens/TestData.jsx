import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";
import { listProgresss, getProgress, listProgresses } from "../graphql/queries";

// -- TODO -- If use S3, need a way to get all items in storage --
// import { getUrl } from 'aws-amplify/storage';
// import { list } from 'aws-amplify/storage';

// try {
//   const result = await list({
//     prefix: 'public/'
//   });
// } catch (error) {
//   console.log(error);
// }
// const getUrlResult = await getUrl({
//   key: 'public/Attendance.yml',
// });


function TestData(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [myProgress, setMyProgress] = useState('Empty')
  const [test, setTest] = useState({'nope':'not yet'})

  const variables = {
    filter: {
      // filter for records that match our username
      userID: { eq: props.user.username }
    }
   };
  // -- TODO -- Need to find a way to use this --
  //  const sub = props.client
  //  .graphql({
  //     query: subscriptions.onUpdateProgress,
  //     variables
  //  })
  //  .subscribe({
  //     next: ({ data }) => console.log(data),
  //     error: (error) => console.warn(error)
  //  });

  useEffect(()=> {
   fetchProgress();
   
  }, [myProgress]);

  async function fetchProgress() {
    console.log('Fetch Stuff !!')
  
    const allProgresss = await props.client.graphql({
        query: listProgresses,
        variables: variables
    });
    // -- TODO -- If this doesn't return anything, we might want to initialize here --
    setMyProgress(allProgresss.data.listProgresses.items[0].progress)

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
        <Card>My ID is {props.user.username} and my progress is {myProgress}</Card>
        {/* <Card>Data is {JSON.stringify(sub[0])}</Card> */}
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
