import faqs from '../JSONs/faqs.json';  // Adjust the path according to your file structure

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Collapse } from "antd";
import NavBar from "../ui-components/NavBar";


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
const { Meta } = Card;
const { Panel } = Collapse;

// Import other icons here if needed and use them as intended
function FAQPage(props) {
  const [openMenu, setOpenMenu] = useState(false);
  // const faqs = [
  //   {
  //     question: "What academic supports are in place at City High?",
  //     answer:
  //       "Most classes at City High are team-taught and embed Teaching Associates and Learning Support in the classroom.",
  //   },
  //   {
  //     question: "How are students with learning support educated at City High?",
  //     answer: "Your answer here.",
  //   },
  //   {
  //       question: "What if I apply and my child has an IEP?",
  //       answer: "Your answer here.",
  //   },
  //   {
  //       question: "What is the City High attendance policy?",
  //       answer: "Your answer here.",
  //   },
  //   {
  //       question: " Does City High have for-credit College Electives?",
  //       answer: "Your answer here.",
  //   },
  //   // Add other FAQs here
  // ];
  // const panelItems = faqs.map((faq, index) => ({
  //   key: String(index),
  //   header: faq.question,
  //   children: faq.answer,
  // }));
  const panelItems = faqs.map((faq, index) => ({
    key: String(index),
    header: faq.question,
    children: faq.answer,
  }));
  
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      {/* <div
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
      </div> */}
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
        <h1 className="header1">FAQ</h1>
        {/* <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) =>
            isActive ? <MinusCircleFilled /> : <CheckCircleFilled />
          }
          className="site-collapse-custom-collapse"
          items={panelItems} // Using items prop instead of children
          /> */}
          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) =>
              isActive ? <MinusCircleFilled /> : <CheckCircleFilled />
            }
            className="site-collapse-custom-collapse"
          >
            {faqs.map((faq, index) => (
              <Panel
                header={faq.question}
                key={index}
                className="site-collapse-custom-panel"
              >
                <p>{faq.answer}</p>
              </Panel>
            ))}

          </Collapse>

       </div>
    </div>
  );
}

function AppMenu({ isInline = false }) {
  // Corrected parameter destructuring
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/${e.key}`);
  };
  return (
    <Menu
      style={{ backgroundColor: "white", fontSize: 20, border: "none" }}
      mode={isInline ? "inline" : "horizontal"}
      onClick={handleClick}
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

export default FAQPage;
