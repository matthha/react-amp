import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import {
  MenuOutlined,
} from "@ant-design/icons";
import { Drawer, Menu} from "antd";

const NavBar = ({ user }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setUserEmail] = useState('');

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const user = await getCurrentUser();
          setUserName(user.username);
          setUserEmail(user.email);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };
  
      fetchUserInfo();
    }, []);
  
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
      <div style={{backgroundColor:"#9e2a2b"}}>
      <div className="headerMenu">
        <AppMenu />
      </div>
      </div>
      <Drawer
        placement="left"
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        style={{ backgroundColor: "white" }}
      >
        <div className="navBox">
          <div className="navLogoBox">
            <img src="/logo.png" alt="CCHS's Logo" />
          </div>
          <div className="titleStyle">{username}</div>
          <div className="secondaryContent">example@gmail.com</div>
        </div>
        <div style={{marginTop:20}}></div>
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
      style={{
        backgroundColor: isInline ? "white" : "#9E2A2B",
        fontSize: 20,
        border: "none"
      }}
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
        }
      ]}
    ></Menu>
  );
}
export default NavBar;
