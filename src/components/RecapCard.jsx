import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";

// Move this to a higher level if possible

const RecapCard = ({ title, description, icon }) => {
  let iconObj = icon;
  const navigate = useNavigate();
  const addIconsToLibrary = () => {
    Object.keys(Icons).forEach((key) => {
      if (key === icon && Icons[key].icon) {
        library.add(Icons[key]);
        iconObj = Icons[key];
      }
    });
  };
  addIconsToLibrary(); // Initialize once
  const handleNavigation = (isButton = false) => {
    const isMobile = window.innerWidth <= 500;
    if (isMobile || isButton) {
      navigate(`/recapcontent/${title}`);
    }
  };

  return (
    <div className="recap-card-display" onClick={() => handleNavigation()}>
      <div className="recap-card-icon-text-wrapper">
        <div className="recap-icon-display">
          <FontAwesomeIcon icon={iconObj} className="color-primary-1" />
        </div>
        <div className="recap-text-display">
          <div className="header3">{title}</div>
          <div className="body-text-3 secondary-text">{description}</div>
        </div>
      </div>
      <RightOutlined className="right-arrow-style" />
      <button
        className="recap-button body-text-2"
        onClick={(e) => {
          e.stopPropagation(); // Correct use of event stopping
          handleNavigation(true);
        }}
      >
        See Content
      </button>
    </div>
  );
};

export default RecapCard;
