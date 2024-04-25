// Importing FontAwesomeIcon for icons and useState from React for managing accordion state
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// FAQAccordion functional component with props for question and answer
const FAQAccordion = ({ question, answer }) => {
  // State to track if the accordion is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the open state of the accordion
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Render method for FAQAccordion component
  return (
    <div className="faq-box">
      <div style={{ width: "100%" }}>
        <button onClick={toggleAccordion} className="faq-button">
          {/* Icon changes based on whether the accordion is open or closed */}
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            style={{ marginRight: "10px", padding: "8px 0 0 16px", color: "#000"}}
            size="2xs"
          />
          <p className="header3 color-primary-2 ">{question}</p> {/* Question text */}
        </button>
        {/* Content area that displays if the accordion is open */}
        {isOpen && (
          <div style={{ padding: "0 10px 20px 45px" }}>
            <p className="body-text-2">{answer}</p> {/* Answer text */}
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting FAQAccordion as the default export of this module
export default FAQAccordion;
