import React, { useEffect } from "react";
import { recaps } from "../JSONs/recaps";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Content from "../components/Content";

// Import other icons here if needed and use them as intended
function RecapContentPage() {
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
    <div className="page-body">
      <NavBar />
      <div className="content-body">
        <button
          onClick={handleClick}
          className="body-text-2 semibold color-primary-1 margin-bottom-medium"
          style={{ border: "none", backgroundColor: "white" }}
        >
          &lt; Go Back
        </button>
        <h2 className="header1 margin-bottom-medium">{moduleName}</h2>
        <Content content={moduleContent} />
      </div>
    </div>
  );
}

export default RecapContentPage;
