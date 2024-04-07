import React, { useState } from "react";
import modules from '../JSONs/modules.json';  // Adjust the path according to your file structure

import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
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
// Import other icons here if needed and use them as intended
function RecapPage(props) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div className="contentBody">
        <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
          <h1 className="header1">Orientation Recap</h1>
          <div className="recapCardContainer" style={{paddingTop: 30}}>
            {modules.map((module, index) => (
              <div
                style={{
                  marginRight: 20,
                  marginBottom: 20,
                }}
              >
                <MenuCard title={module.name} description={module.content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, description }) {
    const navigate = useNavigate();
    // const onArrowClick = () => {
    //     // Assuming `navigateTo` is the path to which you want to navigate
    //     navigate('/recapcontent');
    //   };
    const onArrowClick = () => {
      navigate(`/recapcontent/${title}`);  // Pass the module title as a parameter
    };
    return (
        <div className="recapCardDisplay">
          <div className="recapIconDisplay">
            <InfoCircleOutlined className="infoIconStyle" />
            <div className="recapTitleDisplay">
              <div className="header3">{title}</div>
              <div className="header4">{description}</div>
            </div>
            </div>
            <RightOutlined className="rightArrowStyle" onClick={onArrowClick} />
            <button className="goButton" onClick={onArrowClick}>Explore Courses</button>
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

export default RecapPage;
