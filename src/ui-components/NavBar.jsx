import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import { MenuOutlined } from "@ant-design/icons";
import { Authenticator } from "@aws-amplify/ui-react";
import { Drawer, Menu } from "antd";
import { adminInfo } from "../JSONs/adminInfo";

const NavBar = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");

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
    <Authenticator>
      {({ signOut, user }) => (
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
          <div style={{ backgroundColor: "#9e2a2b" }}>
            <div className="headerMenu">
              <AppMenu signOut={signOut}/>
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
            <div style={{ marginTop: 20 }}></div>
            <AppMenu signOut={signOut} isInline={true} />
          </Drawer>
        </>
      )}
    </Authenticator>
  );
};

function AppMenu({ signOut, isInline = false }) {
  // Corrected parameter destructuring
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
              fontSize: 20,
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
                label: "Profile",
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
