import faqs from '../JSONs/faqs.json';  // Adjust the path according to your file structure

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Collapse } from "antd";
import NavBar from "../ui-components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


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
  useEffect(()=> {window.scrollTo(0, 0)},[])
  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div className="contentBody">
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <h1 className="header1" style={{paddingBottom:'20px'}}>FAQ</h1>
          {faqs.map((faq, index) => (
          <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
        ))}
        </div>
       </div>
    </div>
  );
}

function FAQAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginBottom: '10px', 
                  borderBottom: '1px solid #e8e8e8',
                  paddingTop:'10px',
                  background: '#f0f0f1', 
                  border: 'none',
                  borderRadius:'10px',
                  display:'flex',
                  flexDirection:'row',
                   }}>
      <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          style={{ marginRight: '10px', padding: '18px 0 0 20px'}}
          size= '2xs'
        />
        <div style={{ 
          width: '100%'}}>
        <button
        onClick={toggleAccordion}
        style={{ 
          width: '100%', 
          textAlign: 'left', 
          // background: 'none', 
          border: 'none', 
          padding: '10px 10px', 
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          // borderRadius:'10px'
        }}
      >
        <p className='header3'>{question}</p>
      </button>
      {isOpen && (
        <div style={{ padding: '0 0 10px 10px' }}>
          <p className='content'>{answer}</p>
        </div>
      )}
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
