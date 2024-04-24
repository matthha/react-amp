// Core imports
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom and third-party component imports
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";

// Icon imports for various recap topics
import {
  faHandshake,
  faBook,
  faTshirt,
  faClock,
  faLaptop,
  faBus,
} from "@fortawesome/free-solid-svg-icons";

// Recap data import
import { recaps } from "../JSONs/recaps";

// Mapping of icon names to actual icon components
const iconMapping = {
  FaHandshake: faHandshake,
  FaBook: faBook,
  FaTshirt: faTshirt,
  FaClock: faClock,
  FaLaptop: faLaptop,
  FaBus: faBus,
};

// RecapPage component definition
function RecapPage() {
  // Scroll to top when the component is first mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Component render function
  return (
    <div className="page-body">
      <NavBar />
      <div className="content-body">
        <h1 className="header1">Orientation Recap</h1>
        <div className="recap-card-container margin-top-medium">
          {recaps.map((recap, index) => (
            <div key={index} className="margin-bottom-large">
              {/* MenuCard component for each recap item */}
              <MenuCard
                title={recap.title}
                description={recap.description}
                icon={iconMapping[recap.icon]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// MenuCard component definition
function MenuCard({ title, description, icon }) {
  const navigate = useNavigate();

  // Handles navigation, with mobile check for smaller devices
  const handleNavigation = (e, isButton = false) => {
    const isMobile = window.innerWidth <= 500;
    if (isMobile || isButton) {
      navigate(`/recapcontent/${title}`);
    }
  };

  // Render function for MenuCard
  return (
    <div className="recap-card-display" onClick={(e) => handleNavigation(e)}>
      <div className="recap-card-icon-text-wrapper">
        <div className="recap-icon-display">
          {/* Displaying the associated icon */}
          <FontAwesomeIcon icon={icon} className="color-primary-1" />
        </div>
        <div className="recap-text-display">
          <div className="header3">{title}</div>
          <div className="body-text-3 secondary-text">{description}</div>
        </div>
      </div>
      <RightOutlined className="right-arrow-style" />
      {/* Button to explicitly navigate to content */}
      <button
        className="recap-button body-text-2"
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering the card's onClick event
          handleNavigation(e, true);
        }}
      >
        See Content
      </button>
    </div>
  );
}

// Exporting RecapPage as the default export
export default RecapPage;
