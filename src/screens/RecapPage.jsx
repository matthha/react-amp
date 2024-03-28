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
        <h1 className="header1">Orientation Recap</h1>
        {/* <div style={{paddingTop: 30}}>
            <MenuCard title="Introduction" description="Description for Introduction" />
            <MenuCard title="Curriculum" description="Description for Curriculum" />
            <MenuCard title="Policy" description="Description for Policy" />
            <MenuCard title="Dress Code" description="Description for Dress Code" />
            <MenuCard title="Transportation" description="Description for Transportation" />
        </div> */}
        <div style={{paddingTop: 30}}>
          {modules.map((module) => (
            <MenuCard title={module.name} description={module.content} />
          ))}
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
      <Card className="cardStyle">
        {/* <Meta
          title={<div className="titleStyle">{title}</div>}
          description={description}
          style={{ fontWeight: 'bold' }}
        /> */}
        <div style={{ display: 'flex' , alignItems:"space-around", width: 300}}>
            <InfoCircleOutlined className="infoIconStyle" />
            <div className="contentStyle">
                <div className="titleStyle">{title}</div>
                <div>{description}</div>
            </div>
            <RightOutlined className="rightArrowStyle" onClick={onArrowClick} />
        </div>
    
      </Card>
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
