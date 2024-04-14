import React, { useEffect, useState } from "react";
import { recaps } from "../JSONs/recaps";
import { useParams } from "react-router-dom";
import NavBar from "../ui-components/NavBar";
import { useNavigate } from "react-router-dom";
import Content from "../ui-components/Content";
import { Drawer, Menu, Card, Progress, Row, Col } from "antd";

const { Meta } = Card;
// Import other icons here if needed and use them as intended
function RecapContentPage(props) {
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    navigate(`/recap`);
  };
  const { moduleName } = useParams(); // Get the module name from the URL parameter

  const moduleContent = recaps.find(
    (module) => module.title === moduleName
  )?.content;

  return (
    <div style={{ height: "100vh", backgroundColor: "whit" }}>
      <NavBar />
      <div className="contentBody">
        <div style={{ background: "white", padding: 20, minHeight: "100vh" }}>
          <p
            onClick={handleClick}
            style={{ fontWeight: 500, color: "#9E2A2B", fontFamily: "Inter" }}
          >
            &lt; Go Back
          </p>

          <h2 className="header1">{moduleName}</h2>
          <div className="recapContent">
          <Content content={moduleContent} />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default RecapContentPage;
