import React, { useState } from "react";
import modules from '../JSONs/modules.json';  // Adjust the path according to your file structure
import { useParams } from 'react-router-dom';
import NavBar from "../ui-components/NavBar";

import { useNavigate } from 'react-router-dom';

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
function RecapContentPage(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/recap`);
  };
  const { moduleName } = useParams();  // Get the module name from the URL parameter

  const moduleContent = modules.find((module) => module.name === moduleName)?.content;

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div className="contentBody">
      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <p onClick={handleClick} style={{fontWeight:500, color:'#9E2A2B',fontFamily:'Inter'}}>&lt; Go Back</p>
        {/* <h2 className="header1">Dress Code</h2>
        <ul className="dressCodeList">
            <li>Dress Blouse, Shirt with a Collar, Turtleneck</li>
            <li>Sweaters (V-neck or crewneck), Blazers</li>
            <li>Dress Pants: Full length or Ankle</li>
            <li>(No capri pants or shorts)</li>
        </ul> */}
        <h2 className="header1">{moduleName}</h2>
        <p className="content">{moduleContent}</p>
        {/* Other elements */}
        {/* <Row gutter={16} className="imageRow">
            <Col span={8}>
                <img src="../images/shirts.png" alt="Shirts" className="dressCodeImage"/>
            </Col>
            <Col span={8}>
                <img src="../images/pants.png" alt="Pants" className="dressCodeImage"/>
            </Col>
        </Row>
        <ul className="dressCodeList">
            <li>Dress Blouse, Shirt with a Collar, Turtleneck</li>
            <li>Sweaters (V-neck or crewneck), Blazers</li>
            <li>Dress Pants: Full length or Ankle</li>
            <li>(No capri pants or shorts)</li>
        </ul> */}
      </div>
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

export default RecapContentPage;
