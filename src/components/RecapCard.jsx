import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RecapCard = ({ title, description, icon }) => {
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
};

export default RecapCard;
