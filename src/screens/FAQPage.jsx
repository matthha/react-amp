import faqs from '../JSONs/faqs.json';  // Adjust the path according to your file structure

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Collapse } from "antd";
import NavBar from "../components/NavBar";
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
    <div className="page-body">
      <NavBar />
      <div className="content-body">
        <h1 className="header1 margin-bottom-medium">FAQ</h1>
          {faqs.map((faq, index) => (
          <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
        ))}
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
    <div className='faq-box'> 
        <div style={{ 
          width: '100%'}}>
        <button
        onClick={toggleAccordion}
        className='faq-button'
      >
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          style={{ marginRight: '10px', padding: '8px 0 0 16px'}}
          size= '2xs'
        />
        <p className='header3'>{question}</p>
        </button>
        {isOpen && (
          <div style={{ padding: '0 10px 20px 45px' }}>
            <p className='body-text-2'>{answer}</p>
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
