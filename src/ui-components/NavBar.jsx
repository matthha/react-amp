import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  MenuOutlined,
} from "@ant-design/icons";
import { Drawer, Menu, Card} from "antd";
const { Meta } = Card;

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div
        style={{
          background: "#9E2A2B",
          height: "auto",
          padding: "24px 16px",
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
    </>
  );
};

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
export default NavBar;
