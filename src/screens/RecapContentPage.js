import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import {
  MenuOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";
const { Meta } = Card;
// Import other icons here if needed and use them as intended
function RecapContentPage(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/recap`);
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />

      <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
        <p onClick={handleClick} style={{ fontWeight: 500, color: "#9E2A2B" }}>
          &lt; Go Back
        </p>
        <h2 className="header1">Dress Code</h2>
        <ul className="dressCodeList">
          <li>Dress Blouse, Shirt with a Collar, Turtleneck</li>
          <li>Sweaters (V-neck or crewneck), Blazers</li>
          <li>Dress Pants: Full length or Ankle</li>
          <li>(No capri pants or shorts)</li>
        </ul>
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
  );
}

export default RecapContentPage;
