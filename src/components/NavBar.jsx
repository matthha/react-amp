import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { MenuOutlined } from "@ant-design/icons";
import { Authenticator } from "@aws-amplify/ui-react";
import { Drawer, Menu } from "antd";
import { adminInfo } from "../JSONs/adminInfo";

/**
 * NavBar component to display navigation bar with dynamic user information and authentication state.
 * It uses AWS Amplify for authentication and user data retrieval.
 */
const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUserName] = useState("");
  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getCurrentUser();
        setUserName(user.username);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <>
          <div className="menu-icon">
            <MenuOutlined
              onClick={() => {
                setOpenMenu(true);
              }}
            />
          </div>
          <div style={{ backgroundColor: "#9e2a2b" }}>
            <div className="header-menu">
              <AppMenu signOut={signOut} />
            </div>
          </div>
          <Drawer
            placement="right"
            open={openMenu}
            onClose={() => {
              setOpenMenu(false);
            }}
            closable={false}
            style={{ backgroundColor: "white" }}
          >
            <div className="nav-box">
              <a className="nav-logo-box" href="/">
                <img src="/logo.png" alt="CCHS's Logo" />
              </a>
              <div className="body-text-1">{username}</div>
            </div>
            <div className="margin-vertical-large"></div>
            <AppMenu signOut={signOut} isInline={true} />
          </Drawer>
        </>
      )}
    </Authenticator>
  );
};

/**
 * AppMenu component to display the application's main navigation menu,
 * dynamically adjusts based on user's role.
 * @param {function} signOut - Sign out function from AWS Amplify Authenticator context.
 * @param {boolean} isInline - Determines the style of the menu (inline for drawer, horizontal otherwise).
 */

function AppMenu({ signOut, isInline = false }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    // navigate to the route corresponding to the menu item key
    if (e.key === "logout") {
      signOut();
    } else navigate(`/${e.key}`);
  };

  return (
    <Authenticator>
      {({ user }) => {
        if (user?.username === adminInfo.adminUsername) {
          return (
            <Menu
              style={{
                backgroundColor: isInline ? "white" : "#9E2A2B",
                fontSize: 20,
                border: "none",
              }}
              mode={isInline ? "inline" : "horizontal"}
              onClick={handleClick}
              items={[
                {
                  label: "Admin Dashboard",
                  key: "admin",
                },
                {
                  label: "Online Orientation",
                  key: "home",
                },
                {
                  label: "Information Recap",
                  key: "recap",
                },
                {
                  label: "FAQ",
                  key: "faq",
                },
                {
                  label: "Certification",
                  key: "profile",
                },
                {
                  label: "Contact Us",
                  key: "contact",
                },
                {
                  label: "Log out",
                  key: "logout",
                },
              ]}
            />
          );
        } else {
          return (
            <Menu
              style={{
                backgroundColor: isInline ? "white" : "#9E2A2B",
                border: "none",
              }}
              mode={isInline ? "inline" : "horizontal"}
              onClick={handleClick}
              items={[
                {
                  label: "Online Orientation",
                  key: "home",
                },
                {
                  label: "Information Recap",
                  key: "recap",
                },
                {
                  label: "FAQ",
                  key: "faq",
                },
                {
                  label: "Certification",
                  key: "profile",
                },
                {
                  label: "Contact Us",
                  key: "contact",
                },
                {
                  label: "Log out",
                  key: "logout",
                },
              ]}
            />
          );
        }
      }}
    </Authenticator>
  );
}
export default NavBar;
