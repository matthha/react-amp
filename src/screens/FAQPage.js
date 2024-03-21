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
  const faqs = [
    {
      question: "What academic supports are in place at City High?",
      answer:
        "Most classes at City High are team-taught and embed Teaching Associates and Learning Support in the classroom.",
    },
    {
      question: "How are students with learning support educated at City High?",
      answer: "Your answer here.",
    },
    {
        question: "What if I apply and my child has an IEP?",
        answer: "Your answer here.",
    },
    {
        question: "What is the City High attendance policy?",
        answer: "Your answer here.",
    },
    {
        question: " Does City High have for-credit College Electives?",
        answer: "Your answer here.",
    },
    // Add other FAQs here
  ];
  
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />

      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1">FAQ</h1>

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

export default FAQPage;
